import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

const initialBalance = 100;
let account: BankAccount;

beforeEach(() => {
  account = getBankAccount(initialBalance);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account).toEqual(getBankAccount(initialBalance));
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(initialBalance + 1);
    }).toThrow(InsufficientFundsError);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(initialBalance + 1, getBankAccount(initialBalance));
    }).toThrow(InsufficientFundsError);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(initialBalance + 1, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.deposit(initialBalance).getBalance()).toBe(
      initialBalance * 2,
    );
  });

  test('should withdraw money', () => {
    expect(account.withdraw(1).getBalance()).toBe(initialBalance - 1);
    expect(account.withdraw(initialBalance - 1).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const anotherAccount = getBankAccount(0);
    const transferAmount = 50;

    expect(account.transfer(transferAmount, anotherAccount).getBalance()).toBe(
      initialBalance - transferAmount,
    );
    expect(anotherAccount.getBalance()).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const maxAttempt = 99;
    let fetchResult = await account.fetchBalance();
    let attemptCount = 0;

    while (fetchResult === null && attemptCount++ < maxAttempt) {
      fetchResult = await account.fetchBalance();
    }

    if (fetchResult !== null) {
      expect(fetchResult).toBeGreaterThanOrEqual(0);
      expect(fetchResult).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balanceAmount = 50;

    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => balanceAmount);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balanceAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockImplementation(async () => null);

    await expect(async () => {
      await account.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
