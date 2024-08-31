import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddStud,
  AuthorizeStudentReg,
  FeePaid,
  RegisterStudent,
  UpdateStudent
} from "../generated/StudentRegistryV2/StudentRegistryV2"

export function createAddStudEvent(_studentAddr: Address): AddStud {
  let addStudEvent = changetype<AddStud>(newMockEvent())

  addStudEvent.parameters = new Array()

  addStudEvent.parameters.push(
    new ethereum.EventParam(
      "_studentAddr",
      ethereum.Value.fromAddress(_studentAddr)
    )
  )

  return addStudEvent
}

export function createAuthorizeStudentRegEvent(
  _studentAddress: Address
): AuthorizeStudentReg {
  let authorizeStudentRegEvent = changetype<AuthorizeStudentReg>(newMockEvent())

  authorizeStudentRegEvent.parameters = new Array()

  authorizeStudentRegEvent.parameters.push(
    new ethereum.EventParam(
      "_studentAddress",
      ethereum.Value.fromAddress(_studentAddress)
    )
  )

  return authorizeStudentRegEvent
}

export function createFeePaidEvent(
  _studentAddress: Address,
  _amount: BigInt
): FeePaid {
  let feePaidEvent = changetype<FeePaid>(newMockEvent())

  feePaidEvent.parameters = new Array()

  feePaidEvent.parameters.push(
    new ethereum.EventParam(
      "_studentAddress",
      ethereum.Value.fromAddress(_studentAddress)
    )
  )
  feePaidEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return feePaidEvent
}

export function createRegisterStudentEvent(
  _studentAddress: Address,
  _StName: string,
  _stAge: i32
): RegisterStudent {
  let registerStudentEvent = changetype<RegisterStudent>(newMockEvent())

  registerStudentEvent.parameters = new Array()

  registerStudentEvent.parameters.push(
    new ethereum.EventParam(
      "_studentAddress",
      ethereum.Value.fromAddress(_studentAddress)
    )
  )
  registerStudentEvent.parameters.push(
    new ethereum.EventParam("_StName", ethereum.Value.fromString(_StName))
  )
  registerStudentEvent.parameters.push(
    new ethereum.EventParam(
      "_stAge",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_stAge))
    )
  )

  return registerStudentEvent
}

export function createUpdateStudentEvent(
  _studentAddress: Address,
  _StName: string,
  _stAge: i32
): UpdateStudent {
  let updateStudentEvent = changetype<UpdateStudent>(newMockEvent())

  updateStudentEvent.parameters = new Array()

  updateStudentEvent.parameters.push(
    new ethereum.EventParam(
      "_studentAddress",
      ethereum.Value.fromAddress(_studentAddress)
    )
  )
  updateStudentEvent.parameters.push(
    new ethereum.EventParam("_StName", ethereum.Value.fromString(_StName))
  )
  updateStudentEvent.parameters.push(
    new ethereum.EventParam(
      "_stAge",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_stAge))
    )
  )

  return updateStudentEvent
}
