/* eslint-disable */
var width = window.childVue.svgWidth
var height = window.childVue.svgHeight
var radius = 40
var insideDiv = true
var stateCounter = 0
var gTransition
window.childVue.states = [

],
window.childVue.stateToRename = {}

window.svg = d3.select('div').attr('id', 'canvas')
  .append('svg')
  .attr('width', String(0.99 * width))
  .attr('height', String(0.92 * height))
  .attr('onmouseleave', 'insideDiv = false')
  .attr('onmouseenter', 'insideDiv = true')

// define arrow markers for graph links
window.svg.append('svg:defs').append('svg:marker')
  .attr('id', 'end-arrow')
  .attr('viewBox', '0 -5 10 10')
  .attr('refX', 4)
  .attr('markerWidth', 12)
  .attr('markerHeight', 12)
  .attr('orient', 'auto')
  .append('svg:path')
  .attr('d', 'M0,-5L10,0L0,5')
  .attr('class', 'end-arrow')

// line displayed when dragging new nodes
var dragLine = window.svg.append('svg:path')
  .attr({
    'class': 'dragline hidden',
    'd': 'M0,0L0,0'
  })

var gTransitions = window.svg.append('g').selectAll('path.transition')
var gStates = window.svg.append('g').selectAll('g.state')

var transitions = function () {
  return window.childVue.states.reduce(function (initial, state) {
    return initial.concat(
      state.transitions.map(function (transition) {
        return {
          source: state,
          transition: transition
        }
      })
    )
  }, [])
}

var transformTransitionEndpoints = function (d, i) {
  var endPoints = d.endPoints()

  var point = [
    d.type === 'start' ? endPoints[0].x : endPoints[1].x,
    d.type === 'start' ? endPoints[0].y : endPoints[1].y
  ]

  return 'translate(' + point + ')'
}

var transformTransitionPoints = function (d, i) {
  return 'translate(' + [d.x, d.y] + ')'
}

var computeTransitionPath = (function () {
  var line = d3.svg.line()
    .x(function (d, i) {
      return d.x
    })
    .y(function (d, i) {
      return d.y
    })
    .interpolate('cardinal')

  return function (d) {
    var source = d.source
    var target = (d.transition.points.length && d.transition.points[0]) || d.transition.target
    var deltaX = target.x - source.x
    var deltaY = target.y - source.y
    var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    var normX = deltaX / dist
    var normY = deltaY / dist
    var sourcePadding = radius + 4 // d.left ? 17 : 12,
    var sourceX = source.x + (sourcePadding * normX)
    var sourceY = source.y + (sourcePadding * normY)

    source = (d.transition.points.length && d.transition.points[d.transition.points.length - 1]) || d.source
    target = d.transition.target
    deltaX = target.x - source.x
    deltaY = target.y - source.y
    dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    normX = deltaX / dist
    normY = deltaY / dist
    var targetPadding = radius + 8 // d.right ? 17 : 12,
    var targetX = target.x - (targetPadding * normX)
    var targetY = target.y - (targetPadding * normY)

    var points = [{
      x: sourceX,
      y: sourceY
    }].concat(
      d.transition.points,
      [{
        x: targetX,
        y: targetY
      }]
    )

    var l = line(points)

    return l
  }
})()

var dragPoint = d3.behavior.drag()
  .on('drag', function (d, i) {
    console.log('transitionmidpoint drag')
    if (!insideDiv) {
      return
    }
    var gTransitionPoint = d3.select(this)
    var gTransitionText = d3.select(this.parentElement).select('text')
    console.log(gTransitionText)

    gTransitionPoint.attr('transform', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      return 'translate(' + [d.x, d.y] + ')'
    })

    gTransitionText.attr('transform', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      return 'translate(' + [d.x, d.y] + ')'
    })

    // refresh transition path
    gTransitions.selectAll('path').attr('d', computeTransitionPath)
    // refresh transition endpoints
    gTransitions.selectAll('circle.endpoint').attr({
      transform: transformTransitionEndpoints
    })

    // refresh transition points
    gTransitions.selectAll('circle.point').attr({
      transform: transformTransitionPoints
    })

    d3.event.sourceEvent.stopPropagation()
  })

var renderTransitionMidPoints = function (gTransition) {
  gTransition.each(function (transition) {
    var transitionPoints = d3.select(this).selectAll('circle.point').data(transition.transition.points, function (d) {
      return transition.transition.points.indexOf(d)
    })

    transitionPoints.enter().append('g').append('circle')
      .attr({
        'class': 'point',
        r: 6,
        transform: transformTransitionPoints
      })
      .on({

      }).call(dragPoint)

    transitionPoints.append('text').text(function (d) {
      console.log(d)
      return d.label
    }).attr({
      'class': 'code',
      'x': '20',
      'y': '4',

      transform: transformTransitionPoints
    }).on({
      contextmenu: function (d, i) {
        console.log('text rigth click')
        var selected = null
        d3.event.preventDefault()
        var text = d3.select(this).data()
        // var circle = d3.select(this.parentNode)
        console.log(text[0].x)
        console.log(text[0].y)
        // console.log(circle)
        var parsedStates = window.childVue.states.map((state) => state.transitions)
        for (state in parsedStates) {
          // console.log(parsedStates[state])
          if (parsedStates[state][0]) {
            for (i in parsedStates[state]) {
              if (parsedStates[state][i].points[0].x == text[0].x) {
                if (parsedStates[state][i].points[0].y == text[0].y) {
                  selected = parsedStates[state][i]
                }
              }
            }
          }
        }
        
        window.childVue.selectedPoint = this
        window.childVue.selected = selected
        window.childVue.dialog = true
        
        console.log('waited')
      }
    })

    transitionPoints.exit().remove()
  })
}

var renderTransitionPoints = function (gTransition) {
  gTransition.each(function (d) {
    var endPoints = function () {
      var source = d.source
      var target = (d.transition.points.length && d.transition.points[0]) || d.transition.target
      var deltaX = target.x - source.x
      var deltaY = target.y - source.y
      var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      var normX = deltaX / dist
      var normY = deltaY / dist
      var sourceX = source.x + (radius * normX)
      var sourceY = source.y + (radius * normY)

      source = (d.transition.points.length && d.transition.points[d.transition.points.length - 1]) || d.source
      target = d.transition.target
      deltaX = target.x - source.x
      deltaY = target.y - source.y
      dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      normX = deltaX / dist
      normY = deltaY / dist
      var targetPadding = radius + 8
      var targetX = target.x - (targetPadding * normX)
      var targetY = target.y - (targetPadding * normY)

      return [{
        x: sourceX,
        y: sourceY
      }, {
        x: targetX,
        y: targetY
      }]
    }

    var transitionEndpoints = d3.select(this).selectAll('circle.endpoint').data([{
        endPoints: endPoints,
        type: 'start'
      },
      {
        endPoints: endPoints,
        type: 'end'
      }
    ])

    transitionEndpoints.enter().append('circle')
      .attr({
        'class': function (d) {
          return 'endpoint ' + d.type
        },
        r: 4,
        transform: transformTransitionEndpoints
      })
    transitionEndpoints.exit().remove()
  })
}

var renderTransitions = function () {
  gTransition = gTransitions.enter().append('g')
    .attr({
      'class': 'transition'
    })
    .on({
      click: function () {
        console.log('transition click')
        d3.selectAll('g.state.selection').classed('selection', false)
        d3.selectAll('g.selected').classed('selected', false)
        window.childVue.selected_states = []

        d3.select(this).classed('selected', true)
        d3.event.stopPropagation()
      },
      mouseover: function () {
        window.svg.select('rect.selection').empty() && d3.select(this).classed('hover', true)
      },
      mouseout: function () {
        window.svg.select('rect.selection').empty() && d3.select(this).classed('hover', false)
      }
    })

  gTransition.append('path')
    .attr({
      d: computeTransitionPath,
      class: 'background'
    })
    .on({
        dblclick: function (d, i) {
          gTransition = d3.select(d3.event.target.parentElement)
          // if (d3.event.ctrlKey) {
          //     var p = d3.mouse(this);

          //     gTransition.classed('selected', true);
          //     d.transition.points.push({
          //         x: p[0],
          //         y: p[1]
          //     });

          //     renderTransitionMidPoints(gTransition, d);
          //     gTransition.selectAll('path').attr({
          //         d: computeTransitionPath
          //     });
          // } else {
          gTransition = d3.select(d3.event.target.parentElement)
          var transition = gTransition.datum()
          var index = transition.source.transitions.indexOf(transition.transition)

          transition.source.transitions.splice(index, 1)
          gTransition.remove()

          d3.event.stopPropagation()
        }
      }
      // }
    )

  gTransition.append('path')
    .attr({
      d: computeTransitionPath,
      class: 'foreground'
    })

  renderTransitionPoints(gTransition)
  renderTransitionMidPoints(gTransition)

  gTransitions.exit().remove()
}

var renderStates = function () {
  var gState = gStates.enter()
    .append('g')
    .attr({
      'transform': function (d) {
        return 'translate(' + [d.x, d.y] + ')'
      },
      'class': 'state'
    })
    .call(drag)

  gState.append('circle')
    .attr({
      r: radius + 13,
      class: 'outer'
    })
    .on({
      mousedown: function (d) {
        console.log('state circle outer mousedown')
        startState = d
        endState = undefined

        // reposition drag line
        dragLine
          .style('marker-end', 'url(#end-arrow)')
          .classed('hidden', false)
          .attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y)

        // force element to be an top
        this.parentNode.parentNode.appendChild(this.parentNode)
        // d3.event.stopPropagation();
      },
      mouseover: function () {
        window.svg.select('rect.selection').empty() && d3.select(this).classed('hover', true)

        // http://stackoverflow.com/questions/9956958/changing-the-position-of-bootstrap-popovers-based-on-the-popovers-x-position-in
        // http://bl.ocks.org/zmaril/3012212
        // $( this).popover( "show");
      },
      mouseout: function () {
        window.svg.select('rect.selection').empty() && d3.select(this).classed('hover', false)
        // $( this).popover( "hide");
      }
    })

  gState.append('circle')
    .attr({
      r: radius,
      class: 'inner'
    })
    .on({
      click: function (d, i) {
        console.log('state circle inner mousedown')

        var e = d3.event
        var g = this.parentNode
        var isSelected = d3.select(g).classed('selected')

        if (!e.ctrlKey) {
          d3.selectAll('g.selected').classed('selected', false)
          window.childVue.selected_states = []
        }

        d3.select(g).classed('selected', !isSelected)

        // reappend dragged element as last
        // so that its stays on top
        g.parentNode.appendChild(g)
        // d3.event.stopPropagation();
        get_selected(g.parentNode)
      },
      mouseover: function () {
        window.svg.select('rect.selection').empty() && d3.select(this).classed('hover', true)
      },
      mouseout: function () {
        window.svg.select('rect.selection').empty() && d3.select(this).classed('hover', false)
      },
      dblclick: function () {
        console.log('state circle outer dblclick')
        var d = d3.select(this.parentNode).datum()

        var index = window.childVue.states.indexOf(d)
        window.childVue.states.splice(index, 1)

        // remove transitions targeting the removed state
        window.childVue.states.forEach(function (state) {
          state.transitions.forEach(function (transition, index) {
            if (transition.target === d) {
              state.transitions.splice(index, 1)
            }
          })
        })

        // console.log( "removed state " + d.label);

        // d3.select( this.parentNode).remove();
        update()
      },
      contextmenu: function (d, i) {
        console.log('state circle inner rightclick')
        // var p = d3.mouse( this);
        var g = this.parentNode
        g = d3.select(g).select('text').text('Pinga')
        console.log(g)
        d3.event.preventDefault()
      }

    })

  gState.append('text')
    .attr({
      'text-anchor': 'middle',
      y: 4
    })
    .text(function (d) {
      return d.label
    })

  gState.append('title')
    .text(function (d) {
      console.log('title')
      console.log(d)
      return d.label
    })
  gStates.exit().remove()
}

var startState, endState
var drag = d3.behavior.drag()
  .on('drag', function (d, i) {
    console.log('drag')
    if (startState) {
      
      return
    }
    if (!insideDiv) {
      return
    }
    var selection = d3.selectAll('.selected')

    // if dragged state is not in current selection
    // mark it selected and deselect all others
    if (selection[0].indexOf(this) === -1) {
      selection.classed('selected', false)
      selection = d3.select(this)
      selection.classed('selected', true)
      selected = selection.datum().label
      window.childVue.selected_states = [selected]
    }

    // move states
    selection.attr('transform', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      return 'translate(' + [d.x, d.y] + ')'
    })

    // move transistion points of each transition
    // where transition target is also in selection
    var selectedStates = d3.selectAll('g.state.selected').data()
    var affectedTransitions = selectedStates.reduce(function (array, state) {
        return array.concat(state.transitions)
      }, [])
      .filter(function (transition) {
        return selectedStates.indexOf(transition.target) !== -1
      })
    affectedTransitions.forEach(function (transition) {
      for (var i = transition.points.length - 1; i >= 0; i--) {
        var point = transition.points[i]
        point.x += d3.event.dx
        point.y += d3.event.dy
      }
    })

    // reappend dragged element as last
    // so that its stays on top
    selection.each(function () {
      this.parentNode.appendChild(this)
    })

    // refresh transition path
    gTransitions.selectAll('path').attr('d', computeTransitionPath)

    // refresh transition endpoints
    gTransitions.selectAll('circle.endpoint').attr({
      transform: transformTransitionEndpoints
    })
    // refresh transition points
    gTransitions.selectAll('circle.point').attr({
      transform: transformTransitionPoints
    })

    gTransitions.selectAll('text.code').attr({
      transform: transformTransitionPoints
    })

    

    d3.event.sourceEvent.stopPropagation()
  })
  .on('dragend', function (d) {
    console.log('dragend')
    // TODO : http://stackoverflow.com/questions/14667401/click-event-not-firing-after-drag-sometimes-in-d3-js

    // needed by FF
    dragLine
      .classed('hidden', true)
      .style('marker-end', '')

    if (startState && endState) {
      if (startState !== endState) {
        startState.transitions.push({
          label: startState.label,
          points: [{
          
            label: '0',
            x: (startState.x + endState.x) / 2,
            y: (endState.y + startState.y) / 2
          }],
          target: endState
        })
      } else {
        startState.transitions.push({
          label: startState.label,
          points: [{
          
            label: '0',
            x: startState.x + 100,
            y: startState.y + 100
          }],
          target: endState
        })
      }
      window.childVue.append_transition(startState.label, endState.label)
      window.childVue.stateToRename = { name: startState, index: startState.transitions.length - 1 }
      // eel.logger(window.childVue.states)
      update()
    }

    startState = undefined
    d3.event.sourceEvent.stopPropagation()
  })

window.svg.on({
  mousedown: function () {
    console.log('mousedown', d3.event.target)
    if (d3.event.target.tagName === 'svg') {
      if (!d3.event.ctrlKey) {
        d3.selectAll('g.selected').classed('selected', false)
        window.childVue.selected_states = []
      }

      var p = d3.mouse(this)

      window.svg.append('rect')
        .attr({
          rx: 6,
          ry: 6,
          class: 'selection',
          x: p[0],
          y: p[1],
          width: 0,
          height: 0
        })
    }
  },
  mousemove: function () {
    // console.log( "mousemove");
    var p = d3.mouse(this)
    var s = window.svg.select('rect.selection')

    if (!s.empty()) {
      var d = {
        x: parseInt(s.attr('x'), 10),
        y: parseInt(s.attr('y'), 10),
        width: parseInt(s.attr('width'), 10),
        height: parseInt(s.attr('height'), 10)
      }
      var move = {
        x: p[0] - d.x,
        y: p[1] - d.y
      }

      if (move.x < 1 || (move.x * 2 < d.width)) {
        d.x = p[0]
        d.width -= move.x
      } else {
        d.width = move.x
      }

      if (move.y < 1 || (move.y * 2 < d.height)) {
        d.y = p[1]
        d.height -= move.y
      } else {
        d.height = move.y
      }

      s.attr(d)

      // deselect all temporary selected state objects
      d3.selectAll('g.state.selection.selected').classed('selected', false)
      window.childVue.selected_states = []

      d3.selectAll('g.state >circle.inner').each(function (stateData, i) {
        if (
          !d3.select(this).classed('selected') &&
          // inner circle inside selection frame
          stateData.x - radius >= d.x && stateData.x + radius <= d.x + d.width &&
          stateData.y - radius >= d.y && stateData.y + radius <= d.y + d.height
        ) {
          d3.select(this.parentNode)
            .classed('selection', true)
            .classed('selected', true)
        }
      })
    } else if (startState) {
      // update drag line
      dragLine.attr('d', 'M' + startState.x + ',' + startState.y + 'L' + p[0] + ',' + p[1])

      var state = d3.select('g.state .inner.hover')
      endState = (!state.empty() && state.data()[0]) || undefined
      
    }
  },
  mouseup: function () {
    console.log('mouseup')
    // remove selection frame
    window.svg.selectAll('rect.selection').remove()

    // remove temporary selection marker class
    d3.selectAll('g.state.selection').classed('selection', false)
  },
  mouseout: function () {
    if (!d3.event.relatedTarget || d3.event.relatedTarget.tagName === 'HTML') {
      // remove selection frame
      window.svg.selectAll('rect.selection').remove()

      // remove temporary selection marker class
      d3.selectAll('g.state.selection').classed('selection', false)
    }
  },
  dblclick: function () {
    console.log('dblclick')
    var p = d3.mouse(this)

    if (d3.event.target.tagName === 'svg') {
      stateCounter += 1
      window.childVue.states.push({
        x: p[0],
        y: p[1],
        label: 'S' + String(stateCounter),
        transitions: []
      })
      window.childVue.append_node('S' + String(stateCounter))
      // eel.logger(window.childVue.states)
      update()
    }
  }

})

update()

function update() {
  console.log('update')
  gStates = gStates.data(window.childVue.states, function (d) {
    return window.childVue.states.indexOf(d)
  })
  renderStates()

  var _transitions = transitions()
  gTransitions = gTransitions.data(_transitions, function (d) {
    return _transitions.indexOf(d)
  })
  renderTransitions()
};

function get_selected(node) {
  var node = d3.selectAll('g.state.selected').data()
  node = node.map((node) => node.label)
  window.childVue.selected_states = node
}

function change_text(value) {
  // console.log(window.childVue.selectedPoint)
  // console.log(window.childVue.stateToRename)
  for (var state in window.childVue.states) {
    if (window.childVue.states[state] === window.childVue.stateToRename.name) {
      console.log(window.childVue.states[state])
      var stateToRename = window.childVue.states[state]
      stateToRename.transitions[window.childVue.stateToRename.index].points[0].label = value
    }
  }
  d3.select(window.childVue.selectedPoint).text(value)  
}