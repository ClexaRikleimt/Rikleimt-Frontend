# Rikleimt-Frontend

## Setup instructions
1. Install Flask with pip. For this project we are using Python 3.5, since that's the latest version of python supported by Flask.. If you don't have that, you'll have to setup a virtual environment to install flask and run the server. Instructions on installing a virtual environment and using it can be found [here][1]. If you don't mind sticking to 3.5 though, you can install it with `pip install flask`.
2. Move the wow_book folder from the root of wow_book_plugin to static. The folder can be found on the team google drive.
3. Install all of the required python packages by navigating to the root directory of the repo, and calling `pip install -r requirements.txt`
..* The packages to be installed are: flask sqlalchemy, flask-assets
4. Install maridaDB from the [site][3]. It's around 400 mb.
5. Run run.py

The maria database username is *root* and the password is *sontaim* (that's cool speak for "story").

[1]: http://flask.pocoo.org/docs/0.12/installation/
[2]: http://flask-assets.readthedocs.io/en/latest/
[3]: https://mariadb.com/kb/en/mariadb/getting-installing-and-upgrading-mariadb/
