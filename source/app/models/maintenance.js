class Maintenance {
  constructor(values, isLastMaintenance, requiresMaintenance) {
    this.isLastMaintenance = isLastMaintenance
    this.requiresMaintenance = requiresMaintenance

    this.id = values.id
    this.mechanic = values.mechanic
    this.description = values.description
    this.cost = values.cost
    this.date = values.date
  }

  needsAttention() {
    return this.isLastMaintenance(this) &&
           this.requiresMaintenance()
  }
}

export default Maintenance
