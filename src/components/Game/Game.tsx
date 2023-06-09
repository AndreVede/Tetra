import * as React from 'react';
import styled from 'styled-components';
import { forms } from './data-game';

const WIDTH_GRILL = 14; // Number of Unit in width
const HEIGHT_GRILL = 28; // Number of Unit in height
const UNIT_GRILL = 20; // Size in px of a Unit
const X_INITIAL = 5;
const Y_INITIAL = 0;

const getFormsList = () => {
    let list: number[][][][] = [];
    for (let form in forms) {
        list.push(forms[form as keyof typeof forms].piece);
    }
    return list;
};

const getFormsColorList = () => {
    let list = [];
    for (let form in forms) {
        list.push(forms[form as keyof typeof forms].color);
    }
    return list;
};

const Canvas = styled.canvas`
    width: ${WIDTH_GRILL * UNIT_GRILL}px;
    height: ${HEIGHT_GRILL * UNIT_GRILL}px;

    border: 5px solid ${(p) => p.theme.colors.tertiary};
    background: ${(p) => p.theme.colors.secondary};
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.25);
`;

const Game: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [refreshScreen, setRefreshScreen] = React.useState<boolean>(false);
    const [changePiece, setChangePiece] = React.useState<boolean>(false);

    const [rotation, setRotation] = React.useState<number>(0);
    const [coord, setCoord] = React.useState<number[]>([X_INITIAL, Y_INITIAL]);
    const [pieceIndex, setPieceIndex] = React.useState<number>(0);
    const formsList = getFormsList();
    const colorFormsList = getFormsColorList();

    const canvasDraw = React.useEffect(() => {
        setRefreshScreen(false);
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                refreshCanevas(context);
            }
        }
    }, [refreshScreen, setRefreshScreen]);
    const onChangePiece = React.useEffect(() => {
        if (changePiece) {
            setChangePiece(false);
            setRotation(0);
            setPieceIndex((prev) => (prev < formsList.length - 1 ? prev + 1 : 0));
            setRefreshScreen(true);
        }
    }, [changePiece, setChangePiece, setPieceIndex, setRotation, setRefreshScreen]);

    const rotate = (sens: 'left' | 'right') => {
        if (sens === 'left') {
            setRotation((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    return formsList[pieceIndex].length - 1;
                }
            });
        } else {
            setRotation((prev) => {
                if (prev < formsList[pieceIndex].length - 1) {
                    return prev + 1;
                } else {
                    return 0;
                }
            });
        }
    };

    const drawForm = (ctx: CanvasRenderingContext2D) => {
        const currentPiece: number[][] = formsList[pieceIndex][rotation];
        for (let x: number = 0; x < currentPiece.length; x++) {
            for (let y: number = 0; y < currentPiece.length; y++) {
                if (currentPiece[y][x] == 1) {
                    let gradient = ctx.createLinearGradient(0, 0, 200, 50);
                    gradient.addColorStop(0, colorFormsList[pieceIndex][0]);
                    gradient.addColorStop(1, '#fff');

                    ctx.fillStyle = colorFormsList[pieceIndex][1]; // Border Piece Color
                    ctx.fillRect((coord[0] + x) * UNIT_GRILL, (coord[1] + y) * UNIT_GRILL, UNIT_GRILL, UNIT_GRILL); // Border Piece
                    ctx.fillStyle = gradient; // Piece Color
                    ctx.fillRect(
                        (coord[0] + x) * UNIT_GRILL + 3,
                        (coord[1] + y) * UNIT_GRILL + 3,
                        UNIT_GRILL - 6,
                        UNIT_GRILL - 6
                    );
                }
            }
        }
    };

    const refreshCanevas = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, WIDTH_GRILL * UNIT_GRILL, HEIGHT_GRILL * UNIT_GRILL); // Clear Grill
        drawForm(ctx);
    };

    const handlerKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
        switch (e.code) {
            case 'ArrowUp':
                rotate('left');
                setRefreshScreen(true);
                e.preventDefault();
                break;
            case 'KeyT':
                setChangePiece(true);
                e.preventDefault();
                break;
        }
    };

    return (
        <>
            <Canvas
                tabIndex={0}
                ref={canvasRef}
                height={HEIGHT_GRILL * UNIT_GRILL}
                width={WIDTH_GRILL * UNIT_GRILL}
                onKeyDown={(e) => handlerKeyDown(e)}
            ></Canvas>
            <button
                onClick={() => {
                    setRefreshScreen(true);
                }}
            >
                Clique moi
            </button>
        </>
    );
};

export default Game;
