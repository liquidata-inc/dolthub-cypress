import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page with no changes";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentFromCommit = "ghqbc0vpjpsl4065rvbgmcgrddh1e69r";
const currentToCommit = "ghqbc0vpjpsl4065rvbgmcgrddh1e69r";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}..${currentToCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should show commit breadcrumbs",
      "[data-cy=repo-commit-breadcrumbs]",
      beVisible,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      beVisible,
    ),
    newExpectation(
      "should show two form selects",
      "[data-cy=form-select]",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should not have viewing message",
      "[data-cy=viewing-message]",
      notExist,
    ),
    newExpectation(
      "should show diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
    ),
    newExpectation(
      "should show view type selector",
      "[data-cy=view-type-selector]",
      beVisible,
    ),
    newExpectation(
      "should show no tables changed message",
      "[data-cy=diff-table-list-no-changes]",
      beVisible,
    ),
    newExpectation(
      "should not show diff table list",
      "[data-cy=diff-table-list]",
      notExist,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
