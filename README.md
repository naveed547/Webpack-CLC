# Webpack-CLC
Webpack Component level Compilation(CLC) project is to perform a compoent level task running. It does ts to js conversion,less to css conversion,compoent level template rendering etc at component level.

**What it does?**<br/>
Compile ts to js file<br/>
Compile less to css file<br/>
Creates html file out a component ejs file<br/>

All it does at coponent level. For ex:

Suppose we have multiple compponents as such<br/>
components => /<componentname> => index.js/index.less/index.html

It will create a different extension files files under respective collection folder with file name as component name

build	=> /js/<componentname>.js<br/>
	=> /css/<componentname>.css<br/>
	=> /images<br/>
	=> /html/<componentname>.html<br/>

**How to run this project**<br/>

-Clone the project into your project directory<br/>
**git clone https://github.com/naveed547/Webpack-CLC.git**  
Pointing to your project directory run npm install<br/>

-To compile all components run the following command<br/>
**npm run build** => build without js compression or<br/>
**npm run start** => build with js compression<br/>  

-To compile specific component without js compression<br/>
**npm run build -- --env.component="aboutus"** --- It compiles or recompiles only aboutus component<br/>
**npm run build -- --env.component="aboutus,faq"** --- It compiles or recompiles only aboutus and faq component<br/>

-To compile specific component with js compression<br/>
**npm run start -- --env.component="aboutus"** --- It compiles or recompiles only aboutus component<br/>
**npm run start -- --env.component="aboutus,faq"** --- It compiles or recompiles only aboutus and faq component<br/>

-or you can directly run webpack --env.component='aboutus'
