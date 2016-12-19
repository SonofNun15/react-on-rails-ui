import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import FuelingEntry from './fueling-entry'

function setup(fueling, onEdit = () => {}, onDelete = () => {}) {
  const props = {
    fueling: {
      aboveAverageMPG: () => {},
      belowAverageMPG: () => {},
      mpg: () => {},
      miles: 5,
      date: new Date(),
      ...fueling,
    },
    onEdit,
    onDelete,
  }

  return shallow(<FuelingEntry {...props} />)
}

describe('FuelingEntry', () => {
  function getRow(wrapper) {
    return wrapper.first()
  }

  it('should contain a row with columns', () => {
    const wrapper = setup()
    const row = getRow(wrapper)
    expect(row.hasClass('row')).to.be.true

    row.children().forEach(col => {
      expect(col.props().className).to.contain('col-')
    })
  })

  describe('the first column', () => {
    function getFirstColumn(wrapper) {
      const row = getRow(wrapper)
      return row.children().first()
    }
    it('should contain an indicator that the MPG when trending up', () => {
      const wrapper = setup({
        aboveAverageMPG: () => true,
        belowAverageMPG: () => false,
      })
      expect(wrapper.find('i.fa.modifier.fa-caret-up.increase').length).to.equal(1)
      expect(wrapper.find('i.fa.modifier.fa-caret-down.decrease').isEmpty()).to.be.true
    })

    it('should contain an indicator that the MPG when trending down', () => {
      const wrapper = setup({
        aboveAverageMPG: () => false,
        belowAverageMPG: () => true,
      })
      expect(wrapper.find('i.fa.modifier.fa-caret-down.decrease').length).to.equal(1)
      expect(wrapper.find('i.fa.modifier.fa-caret-up.increase').isEmpty()).to.be.true
    })

    it('should not contain an indicator if MPG is equal to average', () => {
      const wrapper = setup({
        aboveAverageMPG: () => false,
        belowAverageMPG: () => false,
      })
      expect(wrapper.find('i.fa.modifier.fa-caret-up.increase').isEmpty()).to.be.true
      expect(wrapper.find('i.fa.modifier.fa-caret-down.decrease').isEmpty()).to.be.true
    })

    it('should display MPG', () => {
      const wrapper = setup({ mpg: () => 15.12345 })
      const col = getFirstColumn(wrapper)

      expect(col.find('span').text()).to.equal(' 15.12 MPG')
    })
  })

  describe('the second column', () => {
    function getSecondColumn(wrapper) {
      const row = getRow(wrapper)
      return row.children().at(1)
    }

    it('should display miles', () => {
      const wrapper = setup({ miles: 304 })
      const col = getSecondColumn(wrapper)
      expect(col.find('span').text()).to.equal('304 miles')
    })
  })

  describe('the third column', () => {
    function getThirdColumn(wrapper) {
      const row = getRow(wrapper)
      return row.children().at(2)
    }

    it('should display date', () => {
      const wrapper = setup({ date: new Date(2016, 11, 19) })
      const col = getThirdColumn(wrapper)
      expect(col.find('span').text()).to.equal('Dec 19, 2016')
    })
  })

  describe('the fourth column', () => {
    function getFourthColumn(wrapper) {
      const row = getRow(wrapper)
      return row.children().at(3)
    }

    it('should trigger onEdit when edit button clicked', () => {
      const mockEdit = sinon.spy()
      const wrapper = setup({}, mockEdit)
      const col = getFourthColumn(wrapper)
      const button = col.find('button').first()
      button.simulate('click')
      expect(mockEdit.calledOnce).to.be.true
    })

    it('should trigger onDelete when delete button clicked', () => {
      const mockDelete = sinon.spy()
      const wrapper = setup({}, undefined, mockDelete)
      const col = getFourthColumn(wrapper)
      const button = col.find('button').at(1)
      button.simulate('click')
      expect(mockDelete.calledOnce).to.be.true
    })
  })
})
