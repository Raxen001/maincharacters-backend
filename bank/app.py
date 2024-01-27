import flask
import psycopg2
import sys


app = flask.Flask(__name__)


DB_USER = "avnadmin"
DB_PASSWORD = "AVNS_1WeRvXT_ytqART5ESFg"
DB_HOST = "pg-mc-mc-01.a.aivencloud.com"
DB_PORT = "26477"
DB_DATABASE = "defaultdb"
conn = psycopg2.connect(
    database=DB_DATABASE,
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    port=DB_PORT,
)
cur = conn.cursor()


def check_balance(bank_id):
    cur.execute('SELECT balance FROM user_data WHERE user_id = %s ', (bank_id,))
    return cur.fetchone()[0]


@app.route('/credit', methods=['POST'])
def credit():
    """
    {
        from: <bank_id>,
        to: <bank_id>
        amount: <amount>,
    }
    """
    req = flask.request.get_json()
    print(req)
    FROM = req['from']
    TO = req['to']
    AMOUNT = req['amount']
    if check_balance(FROM) >= AMOUNT:
        cur.execute(
            'UPDATE user_data SET balance = balance - %s WHERE user_id = %s', (AMOUNT, FROM))
        cur.execute(
            'UPDATE user_data SET balance = balance + %s WHERE user_id = %s', (AMOUNT, TO))
    else:
        return "Error Not enough balance in account"
    conn.commit()
    return "Credited successfully"


@app.route('/debit', methods=['POST'])
def debit():
    """
    {
        from: <bank_id>,
        to: <bank_id>
        amount: <amount>,
    }
    """
    req = flask.request.get_json()
    print(req)
    FROM = req['from']
    TO = req['to']
    AMOUNT = req['amount']
    if check_balance(TO) >= AMOUNT:
        cur.execute(
            'UPDATE user_data SET balance = balance - %s WHERE user_id = %s', (AMOUNT, TO))
        cur.execute(
            'UPDATE user_data SET balance = balance + %s WHERE user_id = %s', (AMOUNT, FROM))
    else:
        return "Can't debit insufficent funds"
    conn.commit()
    return "Debited successfully"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
#     db_cur()
