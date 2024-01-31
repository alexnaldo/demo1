import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from 'yup';
import API from "../../api";
import { User } from "../../model";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .required('O nome é obrigatório'),
  email: Yup.string().email('e-mail inválido').required('O e-mail é obrigatório'),
});

export default function AddUser({ navigation }: { navigation: any }) {
  const api = API.getInstance();
  const addUser = async (user: User): Promise<void> => {
    try {
      await api.addUser(user);
      navigation.pop();
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <View style={{ flex: 1 }}>
      <Text>Informe o nome que deseja adicionar</Text>
      <Formik
        initialValues={{ email: '', name: '' }}
        onSubmit={addUser}
        validationSchema={SignupSchema}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput style={styles.inputText}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Nome"
            />
            <TextInput style={styles.inputText}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="e-mail"
            />
            {errors.name && touched.name ? <Text style={styles.errorMessage}>{errors.name}</Text> : null}
            {errors.email && touched.email ? <Text style={styles.errorMessage}>{errors.email}</Text> : null}
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  </>
}

const styles = StyleSheet.create({
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  errorMessage: {
    color: 'red'
  }
});