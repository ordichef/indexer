import { CronJob } from 'cron';

async function do_smt() {
	try {
		console.log('hi');
	} catch (error) {
		console.log(error);
	}
}

async function start() {
	const job = new CronJob(
		'* * * * * *',
		do_smt,
		null,
		true,
		'America/Los_Angeles'
	);
	job.start()
}

start().catch((e: Error) => {
	console.error(e);
	process.exit(1);
});