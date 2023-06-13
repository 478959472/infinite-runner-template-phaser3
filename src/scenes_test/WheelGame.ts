import Phaser from "phaser";
import WheelData from "~/scenes/WheelData";

const data = [
    {"text": "cat", "image": "wheel/cat.jpg", "backgroundColor": "#E64032"},
    {"text": "dog", "image": "wheel/dog.jpg", "backgroundColor": "#F9C321"},
    {"text": "pig", "image": "wheel/pig.jpg", "backgroundColor": "#299948"}
];


//https://b-ccy.oss-cn-beijing.aliyuncs.com/oss-file/20230612105744.png
export default class WheelGame extends Phaser.Scene {
    private wheel!: Phaser.GameObjects.Container;
    private arrow!: Phaser.GameObjects.Image;
    private wheelData: WheelData[];

    constructor() {
        super('wheel-scene');
        this.wheelData = [
            {"text": "猫", "image": "wheel/cat.jpg", "backgroundColor": "#E64032"},
            {"text": "狗", "image": "wheel/dog.jpg", "backgroundColor": "#F9C321"},
            // {"text": "牛", "image": "wheel/cow.jpg", "backgroundColor": "#80B3FF"},
            {"text": "猪", "image": "wheel/pig.jpg", "backgroundColor": "#299948"}
        ];
    }

    // #80B3FF
    preload() {
        this.load.image('arrow', 'wheel/indicator.png');
        // add your wheel image loading code here
        // 加载转盘图片
        this.wheelData.forEach(item => {
            this.load.image(item.text, item.image);
        });
    }

    create() {
        const {width, height} = this.scale;
        // Create a title
        const title = this.add.text(width * 0.5, height * 0.1, 'Penny Game', {
            fontFamily: '"Roboto", "Arial"',  // specify the font family
            fontSize: '34px',  // specify the font size
            color: '#0000ff',  // specify the font color
            align: 'center',  // center-aligned text
            stroke: '#ffffff',  // white stroke
            strokeThickness: 2,  // stroke thickness
            shadow: {color: '#000', fill: true, offsetX: 2, offsetY: 2, blur: 8}  // text shadow
        });
        title.setOrigin(0.5);  // center the text origin
        this.wheel = this.add.container(width * 0.5, height * 0.5);

        const sectors = this.wheelData.length;
        const degreesPerSector = 360 / sectors;

        this.wheelData.forEach((item, index) => {

            const graphics = this.add.graphics();
            graphics.fillStyle(parseInt(item.backgroundColor.replace('#', '0x')), 1);
            // Phaser.Math.DegToRad(index * degreesPerSector) //Phaser.Math.DegToRad((index + 1) * degreesPerSector)
            graphics.slice(0, 0, 200, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(degreesPerSector), false);
            graphics.fillPath();

            const angle = degreesPerSector / 2; // 角度，以度为单位
            const radians = Phaser.Math.DegToRad(angle); // 将角度转换为弧度
            const cosValue = Math.cos(radians); // 计算余弦值
            const sinValue = Math.sin(radians); // 计算正弦值
            console.log('angle:', angle)
            console.log('余弦值:', cosValue)
            console.log('计算正弦值:', sinValue)
            const textX = 100 * cosValue;
            const textY = 100 * sinValue;
            const text = this.add.text(textX, textY, item.text, {
                fontSize: '30px',
                color: '#ffffff',
                align: 'center'
            });
            text.setOrigin(0.5);
            const imageX = 200 * cosValue;
            const imageY = 200 * sinValue;
            const image = this.add.image(imageX, imageY, item.text);
            image.setScale(0.2);// 缩放图像以适应容器，如果需要，你可以修改这个值。

            const sector = this.add.container(0, 0);
            sector.add(graphics);
            // debugger
            sector.add(image);
            sector.add(text);

            // sector.angle = index * degreesPerSector;
            sector.rotation = Phaser.Math.DegToRad(index * degreesPerSector); // convert degrees to radians for rotation
            this.wheel.add(sector);
        });

        this.arrow = this.add.image(90, height * 0.5, 'arrow');

        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            const rounds = Phaser.Math.Between(2, 4);
            const degrees = Phaser.Math.Between(0, 360);

            this.tweens.add({
                targets: this.wheel,
                angle: rounds * 360 + degrees,
                ease: 'Cubic.Out',
                duration: 6000
            });
        });
    }

}
