import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import { mount } from 'enzyme'
import { VehicleContainer, mapStateToProps } from './container'
import Welcome from '../welcome/welcome'
import VehicleList from './list'
import VehicleDialog from '../vehicle-dialog/dialog'
import Vehicle from '../models/vehicle'

const openVehicleDialog = sinon.spy()
const closeVehicleDialog = sinon.spy()
const saveVehicle = sinon.spy()

function setup(props = {}) {
  props = {
    actions: {
      openVehicleDialog,
      closeVehicleDialog,
      saveVehicle,
    },

    loggedIn: true,
    vehicles: [],
    gettingVehicles: false,
    showVehicleDialog: false,

    ...props,
  }

  return mount(<VehicleContainer {...props} />)
}

let vehicleId = 0

function makeVehicle(year, make, model, color, baseMileage) {
  vehicleId++
  return new Vehicle({ id: vehicleId, year, make, model, color, baseMileage })
}

describe('VehicleContainer', () => {
  it('should display a welcome screen when user is not logged in', () => {
    const wrapper = setup({ loggedIn: false })
    expect(wrapper.containsMatchingElement(<Welcome />)).to.be.true
  })

  describe('vehicle list', () => {
    it('should signal when list is loading', () => {
      const wrapper = setup({ gettingVehicles: true })
      expect(wrapper.containsMatchingElement(<VehicleList loading={true} vehicles={[]} />)).to.be.true
    })

    it('should display vehicles', () => {
      const vehicles = [
        makeVehicle(2009, 'Honda', 'Civic', 'Blue', 80341),
        makeVehicle(2004, 'Chevy', 'Cobalt', 'Silver', 130879),
      ]
      const wrapper = setup({ vehicles })
      expect(wrapper.containsMatchingElement(<VehicleList vehicles={vehicles} />)).to.be.true
    })
  })

  describe('vehicle dialog', () => {
    it('should show the vehicle dialog when appropriate', () => {
      const wrapper = setup({ showVehicleDialog: true })
      expect(wrapper.containsMatchingElement(<VehicleDialog show={true} />)).to.be.true
    })

    it('should hide vehicle dialog when appropriate', () => {
      const wrapper = setup({ showVehicleDialog: false })
      expect(wrapper.containsMatchingElement(<VehicleDialog show={true} />)).to.be.false
    })
  })

  it('should trigger add vehicle action', () => {
    const wrapper = setup()
    wrapper.find('.vehicles button').simulate('click')
    expect(openVehicleDialog.calledOnce).to.be.true
  })

  it('should trigger close dialog action', () => {
    // accessing model from React Bootstrap is difficult,
    //  so we'll simulate by triggered onClose on the dialog
    const wrapper = setup({ showVehicleDialog: true })
    const dialog = wrapper.find(VehicleDialog)
    dialog.props().onClose()
    expect(closeVehicleDialog.calledOnce).to.be.true
  })

  it('should trigger vehicle save', () => {
    // accessing model from React Bootstrap is difficult,
    //  so we'll simulate by triggered onClose on the dialog
    const wrapper = setup({ showVehicleDialog: true })
    const dialog = wrapper.find(VehicleDialog)
    const newVehicle = makeVehicle(2014, 'Ford', 'Mustang', 'Ruby', 503)
    dialog.props().onCreate(newVehicle)
    expect(closeVehicleDialog.calledOnce).to.be.true
    expect(saveVehicle.calledWith(newVehicle)).to.be.true
  })

  describe('mapStateToProps', () => {
    it('should map properties from state', () => {
      const sampleState = {
        profile: {
          loggedIn: true,
          settings: { name: 'Josh' },
        },
        vehicleList: {
          vehicles: [
            makeVehicle(2003, 'Honda', 'Odyssey', 'Beige', 202097)
          ],
          stale: false,
          gettingVehicles: true,
          showVehicleDialog: false,
        },
      }

      const props = mapStateToProps(sampleState)

      expect(props.loggedIn).to.be.true
      expect(props.vehicles).to.have.length(1)
      expect(props.vehicles[0].year).to.equal(2003)
      expect(props.gettingVehicles).to.be.true
      expect(props.showVehicleDialog).to.be.false
    })
  })
})
