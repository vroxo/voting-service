#!/bin/sh

npm run cti create './src/@shared/application' -- -i '*spec.ts' -b && 
npm run cti create './src/@shared/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/@shared/infra' -- -i '*spec.ts' -i 'migrator-cli.ts' -b && 

npm run cti create './src/user/application' -- -i '*spec.ts' -b && 
npm run cti create './src/user/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/user/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/topic/application' -- -i '*spec.ts' -b && 
npm run cti create './src/topic/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/topic/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/session/application' -- -i '*spec.ts' -b && 
npm run cti create './src/session/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/session/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/vote/application' -- -i '*spec.ts' -b && 
npm run cti create './src/vote/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/vote/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/auth/application' -- -i '*spec.ts' -b && 
npm run cti create './src/auth/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/auth/infra' -- -i '*spec.ts' -b