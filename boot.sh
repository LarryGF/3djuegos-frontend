
#!/bin/sh

cd ..
echo $(pwd)
export PYTHONHOME="$(pwd)/pyenv"
pyenv/bin/python pyenv/bin/uvicorn pysrc.app:app

