//global단계에서 메서드를 써주면 됨. 1번쨰 인자는 테스트이름,
//2번쨰는 어떠한 테스트를 할지 써줌.단순히 실행시켜줌.
const {calculateTip, 
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add} = require('../src/math');

test('Should calculate total with tip',()=>{
    const total = calculateTip(10,0.3)
    // 이렇게 if문을 일일이 쓰면 끝이없을 것임.
    // if(total !==13){
    //         throw new Error('Total tip should be 13 Got'+ total)
    //     }
    expect(total).toBe(13);
})

test('Should convert 32 F to 0 C', ()=>{
    const result = fahrenheitToCelsius(32);
    expect(result).toBe(0)
})

test('Should convert 0 to 32', ()=>{
    const result = celsiusToFahrenheit(0);
    expect(result).toBe(32);
})
// //done은 임의 이름.
// test('Async test demo', (done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         //done()이 call되야 모든 코드가 돌아간걸로 간주.
//         done()
//     }, 2000)

// })

test('Should add two numbers', (done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done();
    })
})

test('Should add two numbers async/await', async ()=>{
    const sum = await add(10,22)
    expect(sum).toBe(32)
})


// test('Hello world',()=>{

// })

// test('This should fail',()=>{
//     throw new Error('Failure')
// })