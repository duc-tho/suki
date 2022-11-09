import CustomButton from "../components/CustomButton";
import CustomTextField from "../components/CustomTextField";

export default function Home() {
    return (
        <div>
            <CustomTextField fullWidth value={'Halo'}></CustomTextField>
            <br />
            <CustomButton fullWidth>Click me!</CustomButton>
        </div>
    )
}
