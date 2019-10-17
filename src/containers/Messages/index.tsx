import * as React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import { useRootData } from '../../tools/useRootData';

// Types
import { IMessage, IMessageItem, IMessageArea, IInputMessageArea } from '../../types/Messages';

// Styles
import { useMessageItemStyles, useSendMessageStyles, useMessageAreaStyles } from './styles';

const tmp_messages: Array<IMessage> = [
    { id: '1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', created: '1st April 2019', authorName: 'Ivan', authorId: '1' },
    { id: '2', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '2nd April 2019', authorName: 'Petr', authorId: '2' },
    { id: '3', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '3rd April 2019', authorName: 'Vasiliy', authorId: '3' },
    { id: '4', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '3rd April 2019', authorName: 'Vasiliy', authorId: '3' },
    { id: '5', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '3rd April 2019', authorName: 'Vasiliy', authorId: '3' },
    { id: '6', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', created: '3rd April 2019', authorName: 'Vasiliy', authorId: '3' },
];

const MessageItem: React.FC<IMessageItem> = ({ message, userId }: IMessageItem) => {
    const classes = useMessageItemStyles();
    return (
        <Paper className={userId === message.authorId ? classes.outputMessage : classes.inputMessage}>
            <Typography variant="h5" component="h3">
                {userId === message.authorId ? 'You' : message.authorName}
            </Typography>
            <Typography component="p">
                {message.text}
            </Typography>
            <Box className={classes.infoContainer} mt={2}>
                <Typography component="span" variant="caption" gutterBottom>
                    {message.created}
                </Typography>
                <Typography component="span" variant="caption" gutterBottom>
                    {
                        !(userId === message.authorId) && <span>1</span>
                    }
                </Typography>
            </Box>
        </Paper>
    )
};

const MessagesArea: React.FC<IMessageArea> = ({ messages, userId }: IMessageArea) => {
    const classes = useMessageAreaStyles();
    return (
        <Box component="section" className={classes.messageArea}>
            {
                messages.map((msg) => <MessageItem key={msg.id} message={msg} userId={userId} />)
            }
        </Box>
    )
};

const InputMessageArea: React.FC<IInputMessageArea> = ({ value, onChange, onSubmit }: IInputMessageArea) => {
    const classes = useSendMessageStyles();
    return (
        <Box component="form" className={classes.form} onSubmit={($event: React.SyntheticEvent) => {
            $event.preventDefault();
            if (!!value) onSubmit(value);
        }}>
            <TextField
                id="outlined-dense-multiline"
                label="Dense multiline"
                margin="dense"
                variant="outlined"
                multiline
                fullWidth
                rowsMax="4"
                rows="4"
                value={value}
                onChange={($event: React.SyntheticEvent) => { onChange(($event.target as any).value) }}
            />
            <Fab color="primary" className={classes.fab} type="submit" disabled={!value}>
                <SendIcon />
            </Fab>
        </Box>

    )
};


export const MessagePageView: React.FC<any> = (props: any) => {
    const userId: string = '3';
    const [newMessage, setNewMessage] = React.useState<string>('');

    const sendMessage = (message: string) => {
        console.log('message', message)
        props.sendMessage(message).then((response: any) => {
            console.log('response', response);
        });
    };

    return (
        <Box component="section">
            <MessagesArea messages={tmp_messages} userId={userId} />
            <InputMessageArea value={newMessage} onChange={setNewMessage} onSubmit={sendMessage} />
        </Box>
    )
};

const MessagePage: React.FC<any> = (props) => {
    const { list, loadAll, sendMessage } = useRootData(store => ({
        list: store.messages.list.toJS(),
        loadAll: store.messages.loadAll,
        sendMessage: store.messages.sendMessage,

    }));

    return <MessagePageView list={list} sendMessage={sendMessage} loadAll={loadAll} {...props} />
};

export default MessagePage;
