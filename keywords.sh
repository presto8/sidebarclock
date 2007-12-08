IN=$1
OUT=${1%%.xx}

sed -e 's/xxVER/1.11/g' \
    -e 's/vvDATE/2007-12-08/g' \
    "$IN" >"$OUT"

rm $IN
