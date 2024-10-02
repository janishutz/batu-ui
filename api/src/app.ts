import express from 'express';
import path from 'node:path';
import expressSession from 'express-session';
import fs from 'node:fs';
import bodyParser from 'body-parser';
import cors from 'cors';

declare let __dirname: string | undefined
if ( typeof( __dirname ) === 'undefined' ) {
    __dirname = path.resolve( path.dirname( '' ) );
}

declare module 'express-session' {
    interface SessionData {
        isAuth: boolean;
    }
}

const run = () => {
    let app = express();
    app.use( expressSession ( {
        secret: 'oasdvövböoweivaöiewväiweväowecäievwoaweävciwecfwegifwp9uiqc32p9qc',
        resave: true,
        saveUninitialized: true
    } ) );

    app.use( cors( {
        origin: true,
        credentials: true,
    } ) );
    app.set( 'trust proxy', 1 );

    app.use( bodyParser.urlencoded( { extended: false } ) );
    app.use( bodyParser.json() );


    app.post( '/unlock', ( request, response ) => {
        if ( request.body.password === 'stop smoking!' ) {
            request.session.isAuth = true;
            response.send( 'ok' );
        } else {
            response.status( 403 ).send( 'ERROR' );
        }
    } );



    app.get( '/check', ( request, response ) => {
        if ( request.session ) {
            if ( request.session.isAuth ) {
                response.send( true );
            } else {
                response.status( 403 ).send( false );
            }
        } else {
            response.status( 403 ).send( false );
        }
    } );

    app.get( '/get', ( request, response ) => {
        if ( request.session.isAuth ) {
            let data = {};
            try {
                data = JSON.parse( '' + fs.readFileSync( path.join( __dirname + '/data/batu.json' ) ) );
            } catch ( err ) { /* empty */ }
            response.send( data );
        } else {
            response.status( 403 ).send( 'ERROR' );
        }
    } );

    app.post( '/update', ( request, response ) => {
        if ( request.session.isAuth ) {
            const body = request.body;

            // Data points:
            /* 
                day: string;
                count: number;
                difficulty: number;
                brainUsagePercentage: number;
                sleepHours: number;
                stressLevel: number;
            */

            if ( body.count && body.day && body.difficulty ) {
                let data = {};
                try {
                    data = JSON.parse( '' + fs.readFileSync( path.join( __dirname + '/data/batu.json' ) ) );
                } catch ( err ) { /* empty */ }
                data[ body.day ] = '';
                response.send( 'stored' );
            } else {
                response.status( 400 ).send( 'ERR_INVALID_REQ' );
            }
        } else {
            response.status( 403 ).send( 'ERROR' );
        }
    } );

    app.use( ( request: express.Request, response: express.Response ) => {
        response.status( 404 ).send( 'ERR_NOT_FOUND' ) 
    } );


    const PORT = process.env.PORT || 8080;
    app.listen( PORT );
}

export default {
    run
}