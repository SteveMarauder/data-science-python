# Independent teaching example; synthetic data.
import sqlite3
con = sqlite3.connect(':memory:')
con.execute('CREATE TABLE trips (city TEXT, minutes REAL)')
con.executemany('INSERT INTO trips VALUES (?, ?)', [('Taipei', 20), ('Taipei', 30), ('Tainan', 15)])
print(con.execute('SELECT city, AVG(minutes) FROM trips GROUP BY city ORDER BY city').fetchall())
con.close()
