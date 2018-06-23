import app from '../app';

app.set('port', parseInt(process.env.PORT, 10) || 8000);

app.listen(app.get('port'));
