module.exports = function(){
	var outputDir = '../CrazyMovies/src/main/webapp';

	var config = {
		allTs: './app/**/*.ts',
		typings: './typings/**/*.d.ts',
		excludeMain: '!typings/main/ambient/es6-shim/index.d.ts',
		excludeMain2: '!typings/main.d.ts',
		outPutDir: outputDir,
		tsOutputPath: outputDir + '/app/'
	};
	
	return config;
}