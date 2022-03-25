# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
from flask_jwt_extended import (
	create_access_token,
	get_jwt,
	jwt_required,
	JWTManager,
	verify_jwt_in_request
)


# settings-------------------------------------------------------------------
user = Blueprint('user', __name__)


