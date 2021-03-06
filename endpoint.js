var Houkou = require('houkou')
var qed = require('qed')

function Endpoint (name, path) {
  if (!name || !path) {
    throw new Error('Missing required tag and path parameters')
  }
  if (path[0] !== '/') {
    throw new Error('Path must start with a forward slash /')
  }
  if (!(this instanceof Endpoint)) {
    return new Endpoint(name, path)
  }

  this.name = name
  this.path = path
  var h = new Houkou(path)
  this.pattern = h.pattern
  this.parameters = h.parameters
  this.build = h.build
}

['get','post','put','delete'].forEach(function (method) {
  Endpoint.prototype[method] = function (opts, fn, args) {
    // if (typeof opts === 'function') {
    //   fn = opts
    //   opts = {}
    //   args = Array.prototype.slice.call(arguments, 1)
    // }
    // else { args = Array.prototype.slice.call(arguments, 2) }

    var args = Array.prototype.slice.call(arguments, typeof opts === 'function' ? 0 : 1)

    //console.log(args, typeof opts, typeof args[0])
    this[method.toUpperCase()] = qed.apply(null, args)

    //console.log(method.toUpperCase() + 'ing ' + this.name + ' (' + this.path + ')')
    return this
  }
})

module.exports = Endpoint