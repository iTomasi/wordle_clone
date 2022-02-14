import React, { useState } from "react";
import { LinksFunction, useNavigate } from "remix";
import { toast } from "react-hot-toast";

// Components
import Input from "~/components/form/Input";
import Button from "~/components/Button";

// Helpers
import { word_RegExp, trys_RegExp } from "~/helpers/customRegExp";

// Requests
import { AxiosCreateGame } from "~/requests/localApi/AxiosGame";

// Css
import formCss from "~/css/pages/auth/form.css";
import gameCss from "~/css/pages/create/game.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: formCss },
        { rel: "stylesheet", href: gameCss }
    ]
}

const CreateGame = () => {
    const navigate = useNavigate();

    const [inputsFields, setInputsFields] = useState<any>({
        word: {
            regExp: word_RegExp,
            errorMessage: "Your word should contains between 3 - 45 characters. Characters alloweds: [A-Z]",
            isValid: true,
            value: ""
        },

        trys: {
            regExp: trys_RegExp,
            errorMessage: "Trys should be >= 1 and <= 20",
            isValid: true,
            value: ""
        },

        description: {
            value: ""
        }
    })

    const [fetching, setFetching] = useState<boolean>(false)

    const handleOnBlurInputs = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const targetName = e.target.name;

        if (targetName === "word") {
            setInputsFields((prev: any) => (
                {
                    ...prev,
                    word: {
                        ...prev.word,
                        isValid: (prev.word.value.length >= 3 && prev.word.value.length <= 45)
                    }
                }
            ));
            return
        }

        else if (targetName === "trys") {
            setInputsFields((prev: any) => {
                const parseValue = parseInt(prev.trys.value)

                const isValid = 
                    (!isNaN(parseValue) && parseValue >= 1 && parseValue <= 20)

                return {
                    ...prev,
                    trys: {
                        ...prev.trys,
                        isValid
                    }
                }
            })
            return
        }

        console.log({targetName});
        console.log("wtf")
    }

    const handleOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const targetName = e.target.name;

        if (targetName === "description") {
            setInputsFields((prev: any) => (
                {
                    ...prev,
                    description: {
                        ...prev.description,
                        value: e.target.value
                    }
                }
            ));
            return
        }

        setInputsFields((prev: any) => {
            return {
                ...prev,
                [targetName]: {
                    ...prev[targetName],
                    isValid: prev[targetName].regExp.test(e.target.value),
                    value: prev[targetName].regExp.test(e.target.value) ? e.target.value : prev[targetName].value
                }
            }
        })
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFetching(true);

        const { error, success }: any = await AxiosCreateGame({
            word: inputsFields.word.value,
            trys: inputsFields.trys.value,
            description: inputsFields.description.value
        });

        if (error) {
            setFetching(false)
            if (error.type === "toast") {
                toast.error(error.message);
                return
            }

            setInputsFields((prev: any) => (
                {
                    ...prev,
                    [error.inputName]: {
                        ...prev[error.inputName],
                        isValid: false
                    }
                }
            ));

            return
        }

        toast.success("Wordle game created successfully!")
        navigate("/");
    }

    return (
        <div className="iw_createGame">
            <h1>Create a Game</h1>

            <form className="iw_form" onSubmit={handleOnSubmit}>
                <Input
                    className="mb-8"
                    labelTitle="Word"
                    name="word"
                    placeholder="ex. Laptop"
                    value={inputsFields.word.value}
                    errorMessage={inputsFields.word.errorMessage}
                    isValid={inputsFields.word.isValid}
                    onChange={handleOnChangeInputs}
                    onBlur={handleOnBlurInputs}
                />

                <Input
                    className="mb-8"
                    labelTitle="Trys"
                    name="trys"
                    placeholder="ex. 5"
                    value={inputsFields.trys.value}
                    errorMessage={inputsFields.trys.errorMessage}
                    isValid={inputsFields.trys.isValid}
                    inputMode="numeric"
                    onChange={handleOnChangeInputs}
                    onBlur={handleOnBlurInputs}
                />

                <Input
                    className="mb-8"
                    type="textarea"
                    labelTitle="Description (optional)"
                    name="description"
                    placeholder="Some description from your word"
                    value={inputsFields.description.value}
                    onChange={handleOnChangeInputs}
                />

                <div className="text-right">
                    <Button
                        color="primary"
                        type="submit"
                        loading={fetching}
                    >
                        Create
                    </Button>
                </div>

            </form>
        </div>
    )

};

export default CreateGame;