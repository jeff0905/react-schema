
const user = 'table_user';
const events = 'table_events';
const sms = 'table_sms';

const user_columns = ['user_id', 'user_name', 'user_sms_id'];
const sms_columns = ['sms_id', 'sms_name', 'sms_content', 'sms_user_id'];
const events_columns = ['event_id', 'event_user', 'event_sms'];

export default {
    list: [
        {
            table1: user,
            table2: events,
            column1: user_columns[0],
            column2: events_columns[0]
        },
        {
            table1: user,
            table2: sms,
            column1: user_columns[0],
            column2: sms_columns[0]
        }
    ]
}