import React from 'react';
import {Div, FormLayout,FormLayoutGroup,  Group, Panel, PanelHeader, View, Input} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ua: "",
            cpc: "",
            cr1: "",
            cr2: "",
            avp: "",
            cogs: "",
            ret: 1,
            currency: "RUB",
            value3Index: 1,
            PPPU: 0
        };
    }
    calcPPPU(cpc, cr1, cr2, avp, cogs, ret) {
        var result;
        if(cpc && cr1 && cr2 && avp && cogs && ret) {
            result = (-(cpc / (cr1/100) / (cr2/100)) + (avp - cogs) * ret).toFixed(2) + " " +this.state.currency
        }else {
            result = "Не все данные внесены"
        }
        return result;
    }

    resultPPPU(cpc, cr1, cr2, avp, cogs, ret) {
        var result;
        if(cpc && cr1 && cr2 && avp && cogs && ret) {
            if(-(cpc / (cr1/100) / (cr2/100)) + (avp - cogs) * ret > 0) {
                result = "Вы машстабируете прибыль"
            }
            else {
                result = "Вы масштабируете убыток"
            }
        }
        return result;
    }

    calcCPA(cpc, cr1) {
        var result;
        if(cpc && cr1) {
            result = (cpc/(cr1/100)).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcMargin(avp, cogs) {
        var result;
        if(avp && cogs) {
            result = (avp-cogs).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcCPPU(cpc, cr1, cr2) {
        var result;
        if(cpc && cr1 && cr2) {
            result = (cpc/(cr1/100)/(cr2/100)).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcARPPU(avr, cogs, ret) {
        var result;
        if(avr && cogs && ret) {
            result = ((avr-cogs)*ret).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcARPU(avr, cogs, ret, cr1, cr2) {
        var result;
        if(avr && cogs && ret && cr1 && cr2) {
            result = ((avr-cogs)*ret*(cr1/100)*(cr2/100)).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcTCPA(avr, cogs, ret, cr2) {
        var result;
        if(avr && cogs && ret && cr2) {
            result = ((avr-cogs)*ret*(cr2/100)).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcRoi(avr,cogs,ret,cpc,cr1) {
        var result;
        if(avr && cogs && ret && cr1 && cpc) {
            result = ((avr*ret-cogs*ret)/(cpc/cr1)).toFixed(2) + " %"
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    calcLTV(avp,cogs, ret) {
        var result;
        if(avp && ret) {
            result = ((avp-cogs)*ret).toFixed(2) + " " +this.state.currency
        }else{
            result = "Не все данные внесены"
        }
        return result;
    }

    render() {
        return (
            <View popout={this.state.popout} activePanel='main_panel'>
                <Panel id='main_panel'>
                    <PanelHeader>UCalc</PanelHeader>
                    <Group title="Основные данные">
                        <FormLayout>
                            <FormLayoutGroup top="Число привлечённых пользователей">
                                <Input title="" type="number" placeholder="" onChange={(event) => this.setState({ua: event.target.value})}></Input>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Стоимость клика">
                                <Input title="" type="number" placeholder="" onChange={(event) => this.setState({cpc: event.target.value})}></Input>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Конверсия из перезода в заявку в %">
                                <Input title="" type="number" maxLenght={100} placeholder="" onChange={(event) => this.setState({cr1: event.target.value})}></Input>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Конверсия из заявку в покупку в %">
                                <Input title="" type="number" placeholder="" onChange={(event) => this.setState({cr2: event.target.value})}></Input>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Средний чек">
                                <Input title="" type="number" placeholder="" onChange={(event) => this.setState({avp: event.target.value})}></Input>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Себестоимость">
                                <Input title="" type="number" placeholder="" onChange={(event) => this.setState({cogs: event.target.value})}></Input>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Число продаж за период">
                                <Input title="" defaultValue={1} type="number" placeholder="" onChange={(event) => this.setState({ret: event.target.value})}></Input>
                            </FormLayoutGroup>
                        </FormLayout>
                    </Group>
                    <Group title="Прибыль на платящего пользователя" description="Чистая прибыль, которую вам приносит платящий пользователь">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcPPPU(this.state.cpc, this.state.cr1, this.state.cr2, this.state.avp, this.state.cogs, this.state.ret)}
                            </Div>
                        </Div>
                        <Div style={{textAlign:'center'}}>
                            {this.resultPPPU(this.state.cpc, this.state.cr1, this.state.cr2, this.state.avp, this.state.cogs, this.state.ret)}
                        </Div>
                    </Group>
                    <Group title="Стоимость дествия (CPA)" description="Стоимость деяствия от пользователя, допустим, стоиомсть заявки.">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcCPA(this.state.cpc, this.state.cr1)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Маржинальность" description="Сумма всех расходов включённых в стоимость товара">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcMargin(this.state.avp, this.state.cogs)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Стоимость 1 платящего пользователя" description="">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcCPPU(this.state.cpc, this.state.cr1, this.state.cr2)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Средняя стоимость 1 платящего пользователя (ARPPU)" description="">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcARPPU(this.state.avp, this.state.cogs, this.state.ret)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Средняя стоимость пользователя (ARPU)" description="">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcARPU(this.state.avp, this.state.cogs, this.state.ret, this.state.cr1, this.state.cr2)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Пороговая стоимость действия" description="То сколько вы максмально можете потратить на стоимость 1 дествия, очень удобноценивать максимальную стоимость лида">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcTCPA(this.state.avp, this.state.cogs, this.state.ret, this.state.cr2)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Пороговая стоимость клика" description="То сколько вы максмально можете потратить на стоимость 1 клика в рекламе при текущих показателяъ конверсии. очень удобно отслеживать пороговую стоимость клика в рекламном канале">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcARPU(this.state.avp, this.state.cogs, this.state.ret, this.state.cr1, this.state.cr2)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Возврат инвестиций (ROI)" description="Одна из важнейших метрик, ROI сколько вам приносит 1 вложенных рубль в процентном выражении, если меньше 100%, это очень фигова">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcRoi(this.state.avp, this.state.cogs, this.state.ret, this.state.cpc, this.state.cr1)}
                            </Div>
                        </Div>
                    </Group>
                    <Group title="Прибыть клиента за всё время работы с ним (LTV)" description="LTV, то сколько суммарно вам приносит клиент за всё время работы с вами">
                        <Div style={{textAlign:'center'}}>
                            <Div style={{backgroundColor: "#528bcc", color:"white"}}>
                                {this.calcLTV(this.state.avp, this.state.cogs, this.state.ret)}
                            </Div>
                        </Div>
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default App;