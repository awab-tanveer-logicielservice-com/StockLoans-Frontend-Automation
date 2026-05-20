import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { When, Then } = createBdd(test);

When('the user navigates to the counterparties page', async ({ addNewCounterPartyPage }) => {
  await addNewCounterPartyPage.navigateToCounterparties();
});

When('the user opens the add new counterparty form', async ({ addNewCounterPartyPage }) => {
  await addNewCounterPartyPage.clickAddNewCounterparty();
});

Then('the basic info tab panel should be visible', async ({ addNewCounterPartyPage }) => {
  await expect(addNewCounterPartyPage.basicInfoTabpanel).toBeVisible();
});

Then('the add counterparty button should be visible', async ({ addNewCounterPartyPage }) => {
  await expect(addNewCounterPartyPage.addCounterpartyButton).toBeVisible();
});

When('the user fills in all counterparty details', async ({ addNewCounterPartyPage }) => {
  const timestamp = Date.now();
  const prefixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  const suffixes = ['Capital', 'Finance', 'Trading', 'Securities', 'Holdings'];
  const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]} ${timestamp}`;
  const shortCode = Math.floor(1000 + Math.random() * 9000).toString();

  await addNewCounterPartyPage.selectEntity('Velocity Clearing LLC - 7359');
  await addNewCounterPartyPage.fillName(name);
  await addNewCounterPartyPage.fillShortCode(shortCode);
  await addNewCounterPartyPage.fillBillingReference(`BR-${timestamp}`);
  await addNewCounterPartyPage.selectCurrency('USD');
  await addNewCounterPartyPage.fillDefaultMargin('1.00');
  await addNewCounterPartyPage.fillLendLimit('50000');
  await addNewCounterPartyPage.fillBorrowLimit('50000');
  await addNewCounterPartyPage.selectType('Regular');
  await addNewCounterPartyPage.selectStatus('Active');
  await addNewCounterPartyPage.selectRounding('No rounding');
  await addNewCounterPartyPage.fillBusinessEmail(`business${timestamp}@yopmail.com`);
  await addNewCounterPartyPage.fillOperationsEmail(`ops${timestamp}@yopmail.com`);
});

Then('the add counterparty button should be enabled', async ({ addNewCounterPartyPage }) => {
  await expect(addNewCounterPartyPage.addCounterpartyButton).toBeEnabled();
});
