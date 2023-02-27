#!/bin/sh

npm run cti create './src/@shared/application' -- -i '*spec.ts' -b && 
npm run cti create './src/@shared/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/@shared/infra' -- -i '*spec.ts' -i 'migrator-cli.ts' -b && 

npm run cti create './src/user/application' -- -i '*spec.ts' -b && 
npm run cti create './src/user/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/user/infra' -- -i '*spec.ts' -b