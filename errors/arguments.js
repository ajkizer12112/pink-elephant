const argumentErrors = [{
    check: (arg) => arg.split("")[0] === "-",
    error: (arg) => { throw new Error(`command does not accept flags as arguments (${arg})`) }
}]


module.exports = argumentErrors