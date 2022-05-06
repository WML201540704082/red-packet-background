import React, { Component } from 'react'
import goback from '../images/goback.png'
import { reqPartnerList } from '../../../api'
import { message } from 'antd'
import { t } from 'i18next'

export default class Partner extends Component {
    formRef = React.createRef()
	constructor(props) {
		super(props)
		this.state = {
            partnerList: []
		}
	}
    componentWillMount() {
		this.getPartnerList()
	}
    getPartnerList = async () => {
        let result = await reqPartnerList()
        if (result.code === 0) {
            this.setState({
                partnerList: result.data.map(item=>{
                    return {
                        ...item,
                        userId: item.userId.substring(0,3)+'****'+item.userId.substring(item.userId.length-4,item.userId.length)
                    }
                })
            })
        } else {
            message.error(result.msg)
        }
    }
    goBack = () => {
        this.props.closeModal()
    }
 
	render() {
        let { partnerList } = this.state
		return (
            <div style={{background:'#ffffff',position:'absolute',width:'100%',height:'100%',zIndex:2}}>
                <div style={{height:'50px',lineHeight:'50px',fontSize:'16px',fontWeight:'bold',display:'flex',justifyContent:'center',borderBottom:'1px solid #DCDCDC'}}>{t('my.my_partner')}</div>
                <img src={goback} onClick={()=>this.goBack()} style={{position:'absolute',top:'16px',left:'15px',width:'15px'}} alt="goback"/>
                <div style={{height:'calc(100vh - 50px)',padding:'0 20px',overflowY:'scroll'}}>
                    {
                        <div style={{width:'100%',height:'100%'}}>
                            <div style={{height:'40px',lineHeight:'40px',color:'#0F0F0F'}}>
                            {t('my.sum')}：{partnerList.length}{t('my.person')}
                            </div>
                            <div>
                                <table width="100%" align="center">
                                    <thead>
                                        <tr style={{height:'30px',fontSize:'14px'}}>
                                            <th style={{fontWeight:'normal'}}>{t('my.number')}</th>
                                            <th style={{fontWeight:'normal'}}>{t('my.user_id')}</th>
                                            <th style={{fontWeight:'normal'}}>{t('my.level')}</th>
                                            <th style={{fontWeight:'normal'}}>{t('my.consumption_amount')}</th>
                                            <th style={{fontWeight:'normal'}}>{t('my.commission_amount')}</th>
                                        </tr>
                                    </thead>
                                    <tbody align="center">
                                        {
                                            partnerList.map((item,index)=>{
                                                return (
                                                    <tr style={{height:'30px',fontSize:'12px',fontWeight:'normal'}}>
                                                        <th style={{fontWeight:'normal'}}>{index+1}</th>
                                                        <th style={{fontWeight:'normal'}}>{item.userId}</th>
                                                        <th style={{fontWeight:'normal'}}>{item.actingLevel}</th>
                                                        <th style={{fontWeight:'normal'}}>{item.amount/1000}k</th>
                                                        <th style={{fontWeight:'normal'}}>{item.commissionAmount/1000}k</th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
		)
	}
}