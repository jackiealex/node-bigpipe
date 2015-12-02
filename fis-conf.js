var config = require('./config');
fis.config.init({
    project: {
        charset: 'utf8',
        md5Length: 8,
        md5Connector: '-' 
    }
});

var mode = process['env']['mode']
var cdn = (mode || 'pro') + '_static_CDN'

fis.config.set('roadmap', {
    domain: config[cdn],
    useCache: false
});

// fis release -m -d output -D
//1. fis规定了某类资源被引用时的引用具体URL
