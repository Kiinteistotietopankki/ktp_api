require('dotenv').config();
const { exec } = require('child_process');

function generateModels() {
  const {
    MYSQL_HOST,
    DB_PORT=3306,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
  } = process.env;

  const command = `npx sequelize-auto -h ${MYSQL_HOST} -d ${MYSQL_DATABASE} -u ${MYSQL_USER} -x ${MYSQL_PASSWORD} -p ${DB_PORT} -e mysql -o ./models`;


  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error generating models: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr: ${stderr}`);
      return;
    }
    console.log(`✅ Models generated successfully:\n${stdout}`);
  });
}

generateModels();
