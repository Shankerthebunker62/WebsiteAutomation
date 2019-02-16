limit = 6;

echo "Running gradle task in loop"

for ((n=1;n<limit;n++))
do
	echo "Running task number: $n"
	gradle task e2e --info
done

echo "Stopping any running gradle task"
gradle --stop