#!/bin/sh

APPLICATION="OpenAccess"
HEADLESS="false"
BROWSER="chrome"
CI="true"
TAGS=''


while($#); do
    case $1 in
        -t | --tags )                   shift
                                        TAGS="$1"
                                        shift
                                        ;;
        -a | --app )                    shift
                                        APPLICATION="$1"
                                        shift
                                        ;;
        -b | --browser )                shift
                                        BROWSER="$1"
                                        shift
                                        ;;
        -h | --headless )               shift
                                        HEADLESS="$1"
                                        shift
                                        ;;
        -c | --ci )                     shift
                                        CI="$1"
                                        shift
                                        ;;                                        
        -h | --help )                   shift
                                        usage
                                        exit
                                        ;;
        * )                             echo "unknown option $1"
                                        usage
                                        exit
                                        ;;
    esac
done

npm install --include=dev
if [ "${CI}" = "true" ]; then
   echo "Running pre-test"
    npm run pretest
    echo "Running on webkit browser"
    BROWSER=webkit HEADLESS=true TAGS=${TAGS} APPLICATION=${APPLICATION} FORCE_COLOR=0 npm run test --ignore-scripts
    echo "Running on firefox browser"
    BROWSER=firefox HEADLESS=true TAGS=${TAGS} APPLICATION=${APPLICATION} FORCE_COLOR=0 npm run test --ignore-scripts
    echo "Running on chrome browser"
    BROWSER=chrome HEADLESS=true TAGS=${TAGS} APPLICATION=${APPLICATION} FORCE_COLOR=0 npm run test --ignore-scripts
    echo "Report generation"
    npm run posttest
else
    BROWSER=${BROWSER} HEADLESS=${HEADLESS} TAGS=${TAGS} APPLICATION=${APPLICATION} FORCE_COLOR=0 npm run test  
    npm run report 
fi