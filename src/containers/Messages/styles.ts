import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useMessageItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputMessage: {
            padding: theme.spacing(3, 2, 1),
            margin: theme.spacing(3, 2),
            maxWidth: '60%',
            marginRight: 'auto',
        },
        outputMessage: {
            padding: theme.spacing(3, 2, 1),
            margin: theme.spacing(3, 2),
            maxWidth: '60%',
            marginLeft: 'auto',
        },
        infoContainer: {
            display: 'flex',
            'justify-content': 'space-between',
        }
    }),
);
export const useSendMessageStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            position: 'relative'
        },
        fab: {
            position: 'absolute',
            right: 15,
            top: 15
        }
    })
);
export const useMessageAreaStyles = makeStyles((theme: Theme) =>
    createStyles({
        messageArea: {
            maxHeight: 'calc(100vh - 252px)',
            overflow: 'auto'
        }
    })
);