import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddStud } from "../generated/schema"
import { AddStud as AddStudEvent } from "../generated/StudentRegistryV2/StudentRegistryV2"
import { handleAddStud } from "../src/student-registry-v-2"
import { createAddStudEvent } from "./student-registry-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _studentAddr = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAddStudEvent = createAddStudEvent(_studentAddr)
    handleAddStud(newAddStudEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddStud created and stored", () => {
    assert.entityCount("AddStud", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddStud",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_studentAddr",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
