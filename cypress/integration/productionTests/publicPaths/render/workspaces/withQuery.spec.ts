import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page with query logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "bd283677-206b-444b-bde4-13332f7cd385"
  : "348d4226-fa12-4c6f-a624-7a597e1af128";
const query = "insert into test_table (pk, a, b, c) values (2, 3, 4, 5)";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}?q=${query}`;
const loggedIn = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const noButtonClickFlow = newClickFlow("[data-cy=no-button]", [
    newExpectation(
      "should remove run message",
      "[data-cy=workspaces-run-msg]",
      notExist,
    ),
  ]);

  const tests = [
    newExpectation(
      "should have repository layout",
      "[data-cy=repository-layout-container]",
      beVisible,
    ),
    newExpectation(
      "should have collapsed sql editor",
      "[data-cy=sql-editor-collapsed]",
      beVisible,
    ),
    newExpectation(
      "should show run message",
      "[data-cy=workspaces-run-msg]",
      beVisible,
    ),
    newExpectation(
      "should show workspace title",
      "[data-cy=workspace-title]",
      newShouldArgs("be.visible.and.contain", "Temporary Workspace"),
    ),
    newExpectation(
      "should have link button",
      "[data-cy=workspace-link]",
      beVisible,
    ),
    newExpectation("should have info icon", "[data-cy=info-icon]", beVisible),
    newExpectation(
      "should not show pull button",
      "[data-cy=create-pull]",
      notExist,
    ),
    newExpectation(
      "should not show discard workspace button",
      "[data-cy=discard-work]",
      notExist,
    ),
    newExpectation(
      "should show diff tabs",
      "[data-cy=diff-tabs]",
      newShouldArgs("be.visible.and.contain", [
        "Query History",
        "Cumulative Diff",
      ]),
    ),
    newExpectation(
      "should show commit list",
      "[data-cy=workspace-commit-list] li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectationWithClickFlows(
      "should remove run message on no click",
      "[data-cy=no-button]",
      beVisible,
      [noButtonClickFlow],
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
