import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    pagination: {
        display: 'flex',
        listStyle: 'none',
        borderRadius: 100,
        height: 32,
        // maxWidth: 200,
        backgroundColor: '#303030',
        padding: '1px 5px',
    },
    pageItem: {
        '.selected': {
            backgroundColor: '#fff',
        },
        ':disabled': {
            pageLink: {
                color: '#6c757d',
                pointerEvents: 'none',
            },
        }
    },
    pageLink: {
        position: 'relative',
        display: 'block',
        color: '#757575',
        textDecoration: 'none',
        lineHeight: '28px',
        padding: '0 10px',
        fontWeight: 400,
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#fff',
            color: '#000',
        },
        '.selected': {
            backgroundColor: '#fff',
        },
        ':disabled': {
            color: '#000'
        }
        // position: relative;
        // display: block;
        // color: #0d6efd;
        // text-decoration: none;
        // background-color: #fff;
        // border: 1px solid #dee2e6;
        // transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        //   border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    // .page-item:not(:first-child) .page-link {
    //     margin-left: -1px;
    //   }
    //   .page-item.active .page-link {
    //     z-index: 3;
    //     color: #fff;
    //     background-color: #0d6efd;
    //     border-color: #0d6efd;
    //   }
    //   .page-item.disabled .page-link {
    //     color: #6c757d;
    //     pointer-events: none;
    //     background-color: #fff;
    //     border-color: #dee2e6;
    //   }
    //   .pagination {
    //   display: flex;
    //   padding-left: 0;
    //   list-style: none;
    // }
}));

export default useStyles;