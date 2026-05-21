import { COLORS } from "../../shared/constants/colors";
import { Submenu } from "../../shared/ui/submenu/submenu";
import { Icons } from "../../shared/ui/icons/icons";
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    SafeAreaView,
} from "react-native";

const USERS = [
    {
        id: "1",
        name: "",
        avatar: "",
    },
    {
        id: "2",
        name: "",
        avatar: "",
    },
    {
        id: "3",
        name: "",
        avatar: "",
    },
    {
        id: "4",
        name: "",
        avatar: "",
    },
    {
        id: "5",
        name: "",
        avatar: "",
    },
];

export default function ChatsScreen(){
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(true);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddUsersModalVisible, setIsAddUsersModalVisible] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const toggleUser = (id: string) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(userId => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    const renderUser = ({ item }: any) => {
        const isSelected = selectedUsers.includes(item.id);
        return (
            <View>
                <View>
                    <Image
                        source={{ uri: item.avatar }}
                    />

                    <Text>{item.name}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => toggleUser(item.id)}
                >
                    <Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style = {{backgroundColor: "#FAF8FF", height: "100%"}}>
            <Submenu 
                reversed = {true}
                links = {[
                    {
                        name: "Контакти",
                        href: "chats",
                        icon: <Icons.FriendsIcon/>
                    },
                    {
                        name: "Повідомлення",
                        href: "chats_add/messages",
                        icon: <Icons.ChatsIcon/>
                    },
                    {
                        name: "Групові чати",
                        href: "chats_add/groups",
                        icon: <Icons.ChatsIcon/>
                    }
                ]}
            />
            <View style = {{width: "15%", height: 2, backgroundColor: COLORS.plum, position: "absolute", bottom: 0, left: "80%", }}>
                <SafeAreaView>
                <TouchableOpacity
                    onPress={() =>
                        setIsCreateModalVisible(true)
                    }
                >
                    <Text>
                        Open Create Group
                    </Text>
                </TouchableOpacity>
                
                <Modal
                    visible={isCreateModalVisible}
                    transparent
                    animationType="fade"
                >
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    setIsCreateModalVisible(false)
                                }
                            >
                            </TouchableOpacity>

                            <Text>Нова група</Text>

                            <TextInput
                                placeholder="Введіть назву"
                                value={groupName}
                                onChangeText={setGroupName}
                            />

                            <Text>
                                Учасники
                            </Text>

                            <FlatList
                                data={USERS}
                                keyExtractor={item => item.id}
                                renderItem={renderUser}
                            />

                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsCreateModalVisible(false)
                                    }
                                >
                                    <Text>Назад</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setIsCreateModalVisible(false);
                                        setIsMenuModalVisible(true);
                                    }}
                                >
                                    <Text>
                                        Створити групу
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isMenuModalVisible}
                    transparent
                    animationType="fade"
                >
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsMenuModalVisible(false);
                                    setIsEditModalVisible(true);
                                }}
                            >
                                <Text>
                                    Редагувати групу
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text>Видалити</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text>
                                    Покинути групу
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isEditModalVisible}
                    transparent
                    animationType="fade"
                >
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    setIsEditModalVisible(false)
                                }
                            >
                            </TouchableOpacity>

                            <Text>
                                Редагування групи
                            </Text>

                            <TextInput
                                placeholder="Назва групи"
                                value={groupName}
                                onChangeText={setGroupName}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    setIsEditModalVisible(false);
                                    setIsAddUsersModalVisible(true);
                                }}
                            >
                                <Text>
                                    + Додати учасників
                                </Text>
                            </TouchableOpacity>

                            <FlatList
                                data={USERS.filter(user =>
                                    selectedUsers.includes(user.id)
                                )}
                                keyExtractor={item => item.id}
                                renderItem={renderUser}
                            />

                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsEditModalVisible(false)
                                    }
                                >
                                    <Text>Назад</Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text>
                                        Зберегти зміни
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isAddUsersModalVisible}
                    transparent
                    animationType="fade"
                >
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    setIsAddUsersModalVisible(false)
                                }
                            >
                            </TouchableOpacity>

                            <Text>
                                Додати учасника
                            </Text>

                            <TextInput
                                placeholder="Пошук"
                            />

                            <FlatList
                                data={USERS}
                                keyExtractor={item => item.id}
                                renderItem={renderUser}
                            />

                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsAddUsersModalVisible(false)
                                    }
                                >
                                    <Text>Скасувати</Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text>Зберегти</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
        </SafeAreaView>
            </View>
        </View>
    )
}