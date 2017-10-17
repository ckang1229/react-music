import React, {Component} from 'react'
import { connect } from 'react-redux'

import refreshScrollMixin from './refreshScrollMixin'

const Mixins = {
    refreshScrollMixin
}

const hookTypes = ['componentDidMount', 'componentWillReceiveProps', 'componentDidUpdate']

export default function(InnerComponent, mixins) {
    let addMethods = {}
    let addProps = {}

    mixins.map((mixinName) => {
        const mixin = Mixins[mixinName];

        if(mixin.methods){
            addMethods = Object.assign(addMethods, mixin.methods)
        }

        if(mixin.props){
            addProps = Object.assign(addProps, mixin.props)
        }

    })

    class withMixins extends Component {
        render() {
            return <InnerComponent {...this.props}/>
        }
    }

    const InnerComponentPrototype = InnerComponent.prototype

    InnerComponent.prototype = Object.assign(InnerComponentPrototype, addMethods, addProps)

    hookTypes.map((hookName) => {
        const InnerComponentHook = InnerComponent.prototype[hookName];

        InnerComponent.prototype[hookName] = function(...arg){
            InnerComponentHook && InnerComponentHook.call(this)

            mixins.map((mixinName) => {
                const hook = Mixins[mixinName].hook[hookName];

                hook && hook.call(this, ...arg)
            })
        }
    })

    InnerComponent.prototype.constructor = InnerComponent

    return connect(
        (state) => {
            let addStates = {}

            mixins.map((mixinName) => {
                const states = Mixins[mixinName].addState ? Mixins[mixinName].addState(state) : '';

                if(states){
                    addStates = Object.assign(addStates, states)
                }

            })

            return addStates
        }
    )(withMixins)
}