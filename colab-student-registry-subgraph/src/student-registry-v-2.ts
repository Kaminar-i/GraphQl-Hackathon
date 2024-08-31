import {
  AddStud as AddStudEvent,
  AuthorizeStudentReg as AuthorizeStudentRegEvent,
  FeePaid as FeePaidEvent,
  RegisterStudent as RegisterStudentEvent,
  UpdateStudent as UpdateStudentEvent
} from "../generated/StudentRegistryV2/StudentRegistryV2"
import {
  AddStud,
  AuthorizeStudentReg,
  FeePaid,
  RegisterStudent,
  UpdateStudent
} from "../generated/schema"

export function handleAddStud(event: AddStudEvent): void {
  let entity = new AddStud(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._studentAddr = event.params._studentAddr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorizeStudentReg(
  event: AuthorizeStudentRegEvent
): void {
  let entity = new AuthorizeStudentReg(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._studentAddress = event.params._studentAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeePaid(event: FeePaidEvent): void {
  let entity = new FeePaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._studentAddress = event.params._studentAddress
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegisterStudent(event: RegisterStudentEvent): void {
  let entity = new RegisterStudent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._studentAddress = event.params._studentAddress
  entity._StName = event.params._StName
  entity._stAge = event.params._stAge

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateStudent(event: UpdateStudentEvent): void {
  let entity = new UpdateStudent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._studentAddress = event.params._studentAddress
  entity._StName = event.params._StName
  entity._stAge = event.params._stAge

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
