var service_host = 'mongodb'
var auth_details = ''
var mongo_database = 'pacman'
var mongo_port = '27017'
var use_ssl = false
var validate_ssl = true
var connection_details = ''

if(process.env.DATABASE_SERVICE_NAME) {
    service_host = process.env.DATABASE_SERVICE_NAME
} else if(process.env.MONGO_NAMESPACE_SERVICE_HOST) {
    service_host = process.env.MONGO_NAMESPACE_SERVICE_HOST
}

if(process.env.MONGODB_DATABASE) {
    mongo_database = process.env.MONGODB_DATABASE
}

if(process.env.MY_MONGO_PORT) {
    mongo_port = process.env.MY_MONGO_PORT
}

if(process.env.MONGO_USE_SSL) {
    if(process.env.MONGO_USE_SSL.toLowerCase() == "true") {
        use_ssl = true
    }
}

if(process.env.MONGO_VALIDATE_SSL) {
    if(process.env.MONGO_VALIDATE_SSL.toLowerCase() == "false") {
        validate_ssl = false
    }
}

if(process.env.MONGODB_USER && process.env.MONGODB_PASSWORD) {
    auth_details = `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@`
}

var hosts = service_host.split(',')

for (let i=0; i<hosts.length;i++) {
  connection_details += `${hosts[i]}:${mongo_port},`
}

connection_details = connection_details.replace(/,\s*$/, "");

var database = {
    url: `mongodb://${auth_details}${connection_details}/${mongo_database}`,
    options: {
        readPreference: 'secondaryPreferred'
    }
};

if(process.env.MONGO_REPLICA_SET) {
    database.options.replicaSet = process.env.MONGO_REPLICA_SET
}

if(use_ssl) {
    database.options.ssl = use_ssl
    database.options.sslValidate = validate_ssl
}

if(process.env.MONGODB_AUTH_SOURCE) {
    database.options.authSource = process.env.MONGODB_AUTH_SOURCE
}


exports.database = database;
