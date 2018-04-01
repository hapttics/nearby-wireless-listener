require('dotenv').load();
var config = {};

/* -- Config Sections -- */
config.device = {};
config.capture = {};
config.csv = {};
config.azureiothub = {};

/* -- Device Identity and Basic Settings -- */
config.device.deviceId = "hnwl00000001";

/* -- Capture Settings -- */
config.capture.maxCaptureSizeMB = 0.5;    // 0.064 = 64KB, 1 = 1MB...
config.capture.outputFolder = '/opt/hapttics-nwl/data/';
config.capture.twTermsArray = ['#AI', '#ML', '#nodejs', '#node', '@twitter'];

/* -- CSV App Info (https://apps.twitter.com),  -- */
config.twitter.consumerKey = process.env.TW_CONSUMER_KEY || 'NoValue';
config.twitter.consumerSecret =  process.env.TW_CONSUMER_SECRET || 'NoValue';
config.twitter.accessToken = process.env.TW_ACCESS_TOKEN || 'NoValue';
config.twitter.accessTokenSecret =  process.env.TW_ACCESS_TOKEN_SECRET || 'NoValue';

/* -- Azure storage settings, env values are taken from the .env file -- */
// The connection string is set in .env (AZURE_STORAGE_CONNECTION_STRING)
config.azure.url = 'https://twsimpleview.blob.core.windows.net/';
config.azure.container = 'incomingtw';
config.azure.folder = '';
config.azure.key = process.env.AZURE_STORAGE_KEY || 'NoValue';

module.exports = config;