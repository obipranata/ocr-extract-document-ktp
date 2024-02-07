const aws = require("aws-sdk");
const config = require("./config");
const textractProcessData = require("./textractProcessData");

aws.config.update({
  accessKeyId: config.awsAccesskeyID,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion
});

const textract = new aws.Textract();

const getText = (block) => {
  let text = '';
  block.forEach((item, index) => {
    if(item.BlockType === 'LINE'){
      text += item.Text+' ';
    }
  })
  return textractProcessData(text);
}

module.exports = async block => {
  const params = {
    Document: {
      /* required */
      Bytes: block
    },
    FeatureTypes: ['FORMS', 'TABLES']
  };

  const request = textract.analyzeDocument(params);
  const data = await request.promise();

  if (data && data.Blocks) {
    return getText(data.Blocks);
  }

  // in case no blocks are found return undefined
  return undefined;
};