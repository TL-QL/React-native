import React, {Component} from 'react';
import { View, Text, ScrollView, FlatList, Button, Modal, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements'; 
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props){
    const dish = props.dish;

    if(dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl+dish.image}}
                >
                <Text style={{margin: 10}}>{dish.description}</Text>
                <View style={styles.formRow}>
                    <Icon raised reverse name={props.favorite?'heart':'heart-o'} type='font-awesome' color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}/>
                    <Icon raised reverse name={'pencil'} type='font-awesome' color='#512DA8' onPress={() => props.onComment()}/>
                </View>
            </Card>
        );
    }
    else{
        return(<View></View>);
    }
}

function RenderComments(props){
    const comments = props.comments;

    const renderCommentItem = ({ item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author+', '+item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component{
    
    constructor(props){
        super(props);
        this.state={
            showModal: false,
            rating: '',
            author: '',
            comment: ''
        };
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId, '');
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }
    
    handleComment(dishId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId,
                               this.state.rating,
                               this.state.author,
                               this.state.comment);
    }

    render(){
        //const dishId = this.props.navigation.getParam('dishId', '');
        const dishId = this.props.route.params.dishId;

        // + will convert string to an equivalent number
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)} 
                    onPress={()=>this.markFavorite(dishId)}
                    onComment={()=>this.toggleModal()}
                 />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={this.state.showModal}
                  onDismiss={() => {this.toggleModal()}}
                  onRequestClose={() => {this.toggleModal()}}>
                  <View style={styles.modal}>
                     <View>
                        <Rating type="star"
                                fractions = { 0 }
                                startingValue = { 0 }
                                imageSize = { 38 }
                                onFinishRating = { rating => this.setState({ rating: rating })}
                                showRating/>
                      </View>
                      <View style={ styles.modalText }>
                        <Input  placeholder = 'Author'
                                leftIcon={
                                    <Icon name = 'user-o' type = 'font-awesome' size = { 24 }/>
                                }
                                onChangeText = { author => this.setState({ author: author })}/>
                     </View>
                     <View style={ styles.modalText }>
                        <Input  placeholder = 'Comment'
                                leftIcon={
                                    <Icon name = 'comment-o' type = 'font-awesome' size = { 24 }/>
                                }
                                onChangeText = { comment => this.setState({ comment: comment })}/>
                      </View>
                      <View style={ styles.modalText }>
                        <Button
                          onPress={() => {this.handleComment(dishId)}}
                          color='#512DA8'
                          title='Submit'
                        />
                      </View>
                      <View style={ styles.modalText }>
                        <Button
                          onPress={() => {this.toggleModal();}}
                          color='#984500'
                          title='Close'
                        />
                     </View>
                   </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      marginLeft: Dimensions.get('window').width/4
    },
    modalText: {
      fontSize: 18,
      margin: 10
    },
    modal: {
      justifyContent: 'center',
      margin: 20,
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

