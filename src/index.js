import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model

app.model(require('./models/users').default);
app.model(require('./models/departments').default);
app.model(require('./models/quarters').default);
app.model(require('./models/templates').default);
app.model(require('./models/reviewsAndComments').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
