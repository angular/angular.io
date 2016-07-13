요약:

        1) 만약 우리가 아래와 같은 'zipconfig.json'파일 또는 'xxx.zipconfig.json'파일을 발견한다면

          {
            "zipRegion": "zip",
            "files": [ "foo.js", "**/**/.css", "!xxx.css"]
          }

          "zipRegion"은 부가적임

          그 다음 우리는 지정된 모든 파일을 압축하고, 추가 문서 태그를 제거합니다.
          만약 특정 'zipRegion'이 있는 파일이 발견되면, 우리는 해당 파일범위만 압축할 것입니다.
          그렇지 않으면 전체 파일을 압축할 것입니다.
