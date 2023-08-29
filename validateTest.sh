#!/bin/sh

function usage {
  echo "Usage: ./validateTest.sh [ -i | --id ] [ -h | --help ]"
  echo " -i  | --id                           JIRA ID f.e. '-i 1234'"\
  echo " -h  | --help                         Show this menu"
}

timestamp() {
	date +"%Y-%m-%d %T"
}

JIRA_ID=''

while(($#)) ; do
    case $1 in
        -i | --id )                     shift
                                        JIRA_ID="$1"
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


#Creation of Feature file
# echo "${SCENARIO}" > ./slims-cucumber/src/tests/OpenAccess/features/todo.feature
# sed -i '1,10s/^/    /' ./slims-cucumber/src/tests/OpenAccess/features/todo.feature

# SCENARIO_NAME="Scenario: ${SCENARIO_NAME}"
# sed -i '1i '"${SCENARIO_NAME}"' ' ./slims-cucumber/src/tests/OpenAccess/features/todo.feature
# sed -i '1i @todo' ./slims-cucumber/src/tests/OpenAccess/features/todo.feature
# sed -i '1,10s/^/    /' ./slims-cucumber/src/tests/OpenAccess/features/todo.feature

# FEATURE="Feature: Default"
# sed -i '1i '"${FEATURE}"' ' ./slims-cucumber/src/tests/OpenAccess/features/todo.feature
HEADER="Authorization: Bearer MzUzMTIxNzMwMjM1OrQ6P21H7zQz3JDybAT2AgPuhbZH"
FILE_LOCATION="./slims-cucumber/src/tests/OpenAccess/features"
sudo rm -rf "${FILE_LOCATION}/*"
curl --header "${HEADER}" --output "${FILE_LOCATION}/${JIRA_ID}.feature" --location "https://sparkflow.collaboration.agilent.com/plugins/servlet/raven/cucumber/export/${JIRA_ID}"

#Execution of Tests in Docker
docker-compose -f ./slims-cucumber/docker/docker-compose.yml up
docker-compose -f ./slims-cucumber/docker/docker-compose.yml down

#Reports for artificats
sudo mkdir -p ./Reports/features
sudo cp -R ./slims-cucumber/test-results/* ./Reports/
sudo mv "${FILE_LOCATION}/${JIRA_ID}.feature" "./Reports/features/"
sudo tar -czf Reports.tar.gz ./Reports

#Clearing rest
sudo rm -rf slims-cucumber
sudo rm -rf slims-qa-docker