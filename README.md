# Webpack-CLC
Webpack Component level Compilation(CLC) project is to perform a compoent level task running. It does ts to js conversion,less to css conversion,compoent level template rendering etc at component level.

**What it does**  
Compile ts to js file
Compile less to css file  
Creates html file out a component ejs file  

All it does at coponent level. For ex:

Suppose we have multiple compponents as such  
components => /<componentname> => index.js/index.less/index.html

It will create a different extension files files under respective collection folder with file name as component name

build	=> /js/<componentname>.js  
	=> /css/<componentname>.css  
	=> /images  
	=> /html/<componentname>.html  

**How to run this project**  

-Clone the project into your project directory  
**git clone https://github.com/naveed547/Webpack-CLC.git**  
Pointing to your project directory run **npm install**  

-To compile all components run the following command  
**npm run build** => build without js compression or  
**npm run start** => build with js compression    

-To compile specific component without js compression  
**npm run build -- --env.component="aboutus"** --- It compiles or recompiles only aboutus component  
**npm run build -- --env.component="aboutus,faq"** --- It compiles or recompiles only aboutus and faq component  

-To compile specific component with js compression  
**npm run start -- --env.component="aboutus"** --- It compiles or recompiles only aboutus component  
**npm run start -- --env.component="aboutus,faq"** --- It compiles or recompiles only aboutus and faq component  

-or you can directly run webpack --env.component='aboutus'
